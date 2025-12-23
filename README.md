# AP Project

A simple **Node.js & Express** web application.

## Project Structure

```
AP/
├── server.js       # Main server file
├── package.json    # Project dependencies
├── package-lock.json
├── .env            # Environment variables
├── public/         # Static files (HTML, CSS, JS)
└── node_modules/   # Installed dependencies (ignored in Git)
```

## Technologies Used

* Node.js
* Express.js
* Axios
* HTML/CSS/JavaScript (for frontend in `public/`)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aiainel/AP.git
cd AP
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file if needed (example):

```
PORT=3000
API_KEY=your_api_key_here
```

## Usage

Start the server:

```bash
node server.js
```

Open your browser and visit:

```
http://localhost:3000
```

## Notes

* `node_modules/` is **ignored** in Git.
* Make sure to install all dependencies with `npm install`.
* Configure environment variables in `.env` as needed.

## License

This project is open-source. You can use and modify it freely.
