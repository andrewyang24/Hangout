from fastapi import FastAPI, HTTPException, Body

app = FastAPI()

class AuthService:
    credentials = {}
    users = {}
    curr_user = None

    @classmethod
    async def register(cls, username: str, password: str, first: str, last: str, phone: str):
        if username in cls.credentials:
            raise HTTPException(status_code=400, detail="Username is already taken")

        cls.credentials[username] = password
        cls.users[username] = {
            "first": first,
            "last": last,
            "active": [],
            "outgoing": [],
            "incoming": [],
            "points": 0,
            "phone": phone
        }

        return username

    @classmethod
    async def login(cls, username: str, password: str):
        if username not in cls.credentials:
            raise HTTPException(status_code=404, detail="User not found")

        stored_password = cls.credentials[username]

        if stored_password != password:
            raise HTTPException(status_code=401, detail="Invalid password")

        cls.curr_user = username
        return username


@app.post("/api/auth/register")
async def register(username: str = Body(...), password: str = Body(...), first: str = Body(...), last: str = Body(...), phone: str = Body(...)):
    try:
        registered_user = await AuthService.register(username, password, first, last, phone)
        return {"username": registered_user}
    except HTTPException as e:
        raise e


@app.post("/api/auth/login")
async def login(username: str = Body(...), password: str = Body(...)):
    try:
        logged_in_user = await AuthService.login(username, password)
        return {"username": logged_in_user}
    except HTTPException as e:
        raise e


@app.get("/api/auth/curr")
async def get_current_user():
    try:
        logged_in_user = AuthService.curr_user
        return {"username": logged_in_user}
    except HTTPException as e:
        raise e


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3000)
