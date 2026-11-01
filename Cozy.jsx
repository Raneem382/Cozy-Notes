
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cozy Notes | Home</title>
    <link rel="stylesheet" href="cozy.css">
</head>
<body>

    <header class="glass top-bar">
        <a href="home.html" class="logo">Cozy Notes ☁️</a>
        <button id="logoutBtn" class="small-button">Log out</button>
    </header>

    <main class="dashboard">
        <section class="welcome">
            <h1 id="welcomeTitle">Welcome back! 💗</h1>
            <p>Your thoughts matter. Take a breath and start fresh.</p>
        </section>

        <section class="glass panel">
            <h2>Search your notes 🔍</h2>
            <input
                type="search"
                id="searchInput"
                placeholder="Search your ideas..."
            >
        </section>

        <section class="glass panel">
            <h2>How are you feeling today? 🌷</h2>
            <p>Write whatever is on your mind.</p>

            <textarea
                id="feeling"
                placeholder="It's okay to express your feelings..."
            ></textarea>

            <button id="feelingBtn">Send my feelings ♡</button>
            <p id="message" class="feedback" aria-live="polite"></p>
        </section>

        <section class="glass panel">
            <h2>My Little Ideas ✨</h2>

            <form id="noteForm">
                <input
                    type="text"
                    id="noteTitle"
                    placeholder="Note title"
                    required
                >

                <textarea
                    id="noteText"
                    placeholder="Write your idea here..."
                    required
                ></textarea>

                <button type="submit">+ Add a Note</button>
            </form>

            <div id="notesList" class="notes-list"></div>
            <p id="emptyMessage">Your ideas will appear here ♡</p>
        </section>

        <footer>Made with love ♡</footer>
    </main>

    <script src="cozy.js"></script>
</body>
