# URL for accesing documentation (main application):
DOCUMENTATION_HOST = "http://127.0.0.1:3000"

# Path to the Xapian database in the filesystem:
DATABASE_PATH = "./index"

# Allow origins for CORS:
ALLOW_ORIGINS = [
    DOCUMENTATION_HOST,
    "http://localhost:3000",
]