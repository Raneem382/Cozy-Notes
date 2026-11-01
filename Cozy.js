
const feelingCards = document.querySelectorAll(".feeling-card");
const feelingSelect = document.querySelector("#note-feeling");
const noteForm = document.querySelector("#note-form");
const noteTitle = document.querySelector("#note-title");
const noteContent = document.querySelector("#note-content");
const characterCount = document.querySelector("#character-count");
const formMessage = document.querySelector("#form-message");
const savedGrid = document.querySelector("#saved-grid");
const notesCount = document.querySelector("#notes-count");

const STORAGE_KEY = "cozyNotes";

let notes = [];

try {
    const storedNotes = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    notes = Array.isArray(storedNotes) ? storedNotes : [];
} catch {
    notes = [];
}

function saveNotes() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        return true;
    } catch {
        formMessage.textContent =
            "Your notes could not be saved. Check your browser storage settings.";
        return false;
    }
}

// Select a feeling card
feelingCards.forEach((card) => {
    card.addEventListener("click", () => {
        const feeling = card.dataset.feeling;

        feelingCards.forEach((item) => {
            item.classList.remove("selected");
            item.setAttribute("aria-pressed", "false");
        });

        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        feelingSelect.value = feeling;
    });
});

// Update character counter
noteContent.addEventListener("input", () => {
    characterCount.textContent =
        `${noteContent.value.length} / 3000`;
});

// Render saved notes
function renderNotes() {
    savedGrid.replaceChildren();

    notesCount.textContent =
        `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

    if (notes.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";

        const icon = document.createElement("span");
        icon.textContent = "📖";

        const title = document.createElement("h3");
        title.textContent = "Your story starts here";

        const description = document.createElement("p");
        description.textContent =
            "Save your first note and it will appear here.";

        emptyState.append(icon, title, description);
        savedGrid.append(emptyState);
        return;
    }

    [...notes].reverse().forEach((note) => {
        const article = document.createElement("article");
        article.className = "saved-note";

        const top = document.createElement("div");
        top.className = "saved-note-top";

        const feeling = document.createElement("span");
        feeling.className = "saved-note-feeling";
        feeling.textContent = note.feeling;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-note";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            `Delete note: ${note.title}`
        );

        deleteButton.addEventListener("click", () => {
            const previousNotes = [...notes];

            notes = notes.filter((item) => item.id !== note.id);

            if (!saveNotes()) {
                notes = previousNotes;
                return;
            }

            renderNotes();
        });

        const title = document.createElement("h3");
        title.textContent = note.title;

        const content = document.createElement("p");
        content.textContent = note.content;

        const date = document.createElement("time");
        date.dateTime = note.createdAt;
        date.textContent = new Date(note.createdAt).toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

        top.append(feeling, deleteButton);
        article.append(top, title, content, date);
        savedGrid.append(article);
    });
}

// Save a new note
noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    const feeling = feelingSelect.value;

    if (!title || !content || !feeling) {
        formMessage.textContent =
            "Please add a title, choose a feeling, and write your note.";
        return;
    }

    const newNote = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        title,
        content,
        feeling,
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);

    if (!saveNotes()) {
        notes.pop();
        return;
    }

    renderNotes();
    noteForm.reset();

    characterCount.textContent = "0 / 3000";
    formMessage.textContent = "Your note has been saved. Take care of yourself! ♡";

    feelingCards.forEach((card) => {
        card.classList.remove("selected");
        card.setAttribute("aria-pressed", "false");
    });

    document.querySelector("#saved-notes").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Initial setup
feelingCards.forEach((card) => {
    card.setAttribute("aria-pressed", "false");
});

renderNotes();
