from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pathlib import Path
import json

app = FastAPI(title="René Portfolio API")

# Ajusta el puerto del frontend si cambia
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://localhost:5174",
                    "http://127.0.0.1:5174"
                ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent / "data" / "portfolio.json"

@app.get("/api/portfolio")
def get_portfolio():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/contact")
def post_contact(msg: ContactMessage):
    # Por ahora solo devuelve OK (luego lo conectamos a correo/DB/Telegram)
    return {"ok": True, "received": msg.model_dump()}
