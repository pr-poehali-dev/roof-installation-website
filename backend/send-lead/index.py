"""Отправка заявки клиента на email кровельной компании"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    gmail_user = "krovlya.severa@gmail.com"
    gmail_password = os.environ["GMAIL_APP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = gmail_user
    msg["To"] = gmail_user

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #fdf6ed; border-radius: 12px; overflow: hidden;">
      <div style="background: #3d2008; padding: 28px 32px;">
        <h2 style="margin: 0; color: #f5a461; font-size: 22px;">КровМастер — новая заявка</h2>
      </div>
      <div style="padding: 28px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #9a7a62; font-size: 13px; width: 120px;">Имя</td>
            <td style="padding: 10px 0; color: #3d2008; font-size: 15px; font-weight: bold;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #e8d5c4;">
            <td style="padding: 10px 0; color: #9a7a62; font-size: 13px;">Телефон</td>
            <td style="padding: 10px 0; color: #3d2008; font-size: 15px; font-weight: bold;">
              <a href="tel:{phone}" style="color: #c45a1a; text-decoration: none;">{phone}</a>
            </td>
          </tr>
          {"" if not message else f'''<tr style="border-top: 1px solid #e8d5c4;">
            <td style="padding: 10px 0; color: #9a7a62; font-size: 13px; vertical-align: top;">Сообщение</td>
            <td style="padding: 10px 0; color: #3d2008; font-size: 15px;">{message}</td>
          </tr>'''}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #c45a1a;">
          <p style="margin: 0; color: #7a5c45; font-size: 13px;">Клиент ждёт звонка. Позвоните как можно скорее!</p>
        </div>
      </div>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(gmail_user, gmail_password)
        smtp.sendmail(gmail_user, gmail_user, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }