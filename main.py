import telebot
from config import TOKEN, ADMIN_ID
import database as db

bot = telebot.TeleBot(TOKEN)

state = {}

# START
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id,
    "🏪 СКЛАД БОТ\n\n/add товар кошуу\n/list товарлар\n/sell сатуу\n/report отчет")

# ➕ ADD PRODUCT
@bot.message_handler(commands=['add'])
def add(message):
    if message.from_user.id != ADMIN_ID:
        return bot.send_message(message.chat.id, "⛔ Уруксат жок!")

    state[message.chat.id] = {"step": "name"}
    bot.send_message(message.chat.id, "Товар атын жаз:")

@bot.message_handler(func=lambda m: m.chat.id in state and state[m.chat.id]["step"] == "name")
def name_step(message):
    state[message.chat.id]["name"] = message.text
    state[message.chat.id]["step"] = "price"
    bot.send_message(message.chat.id, "Баасын жаз:")

@bot.message_handler(func=lambda m: m.chat.id in state and state[m.chat.id]["step"] == "price")
def price_step(message):
    state[message.chat.id]["price"] = float(message.text)
    state[message.chat.id]["step"] = "qty"
    bot.send_message(message.chat.id, "Санын жаз:")

@bot.message_handler(func=lambda m: m.chat.id in state and state[m.chat.id]["step"] == "qty")
def qty_step(message):
    data = state[message.chat.id]

    db.add_product(data["name"], data["price"], int(message.text))

    bot.send_message(message.chat.id, "✅ Товар кошулду!")
    state.pop(message.chat.id)

# 📦 LIST
@bot.message_handler(commands=['list'])
def list_products(message):
    items = db.get_products()
    text = "📦 ТОВАРЛАР:\n\n"

    for i in items:
        text += f"{i[1]} | {i[2]} сом | {i[3]} шт\n"

    bot.send_message(message.chat.id, text)

# 💰 SELL
@bot.message_handler(commands=['sell'])
def sell(message):
    state[message.chat.id] = {"step": "product"}
    bot.send_message(message.chat.id, "Кайсы товар сатылат?")

@bot.message_handler(func=lambda m: m.chat.id in state and state[m.chat.id]["step"] == "product")
def sell_product(message):
    state[message.chat.id]["product"] = message.text
    state[message.chat.id]["step"] = "qty"
    bot.send_message(message.chat.id, "Канча сатылат?")

@bot.message_handler(func=lambda m: m.chat.id in state and state[m.chat.id]["step"] == "qty")
def sell_qty(message):
    data = state[message.chat.id]
    qty = int(message.text)

    db.cur.execute("SELECT price FROM products WHERE name=?", (data["product"],))
    row = db.cur.fetchone()

    if not row:
        return bot.send_message(message.chat.id, "❌ Товар жок")

    total = row[0] * qty

    db.add_sale(data["product"], qty, total)
    db.update_stock(data["product"], qty)

    bot.send_message(message.chat.id, f"✅ Сатылды! {total} сом")
    state.pop(message.chat.id)

# 📊 REPORT
@bot.message_handler(commands=['report'])
def report(message):
    data = db.report()
    text = "📊 КҮНДҮК ОТЧЕТ:\n\n"

    for i in data:
        text += f"{i[0]} → {i[1]} сом\n"

    bot.send_message(message.chat.id, text)

bot.infinity_polling()
