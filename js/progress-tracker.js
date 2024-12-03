class ProgressTracker {
    constructor() {
        this.progressEntries = Utils.getFromStorage('workoutProgress');
    }

    addProgressEntry(entry) {
        const newEntry = {
            ...entry,
            id: Utils.generateId(),
            date: new Date().toISOString()
        };
        this.progressEntries.push(newEntry);
        Utils.saveToStorage('workoutProgress', this.progressEntries);
        this.renderProgress();
    }

    deleteEntry(id) {
        this.progressEntries = this.progressEntries.filter(e => e.id !== id);
        Utils.saveToStorage('workoutProgress', this.progressEntries);
        this.renderProgress();
    }

    renderProgress() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div id="progress-tracker">
                <h2>Workout Progression</h2>
                <form id="progress-form">
                    <input type="text" name="exercise" placeholder="Exercise" required>
                    <input type="number" name="previousWeight" placeholder="Previous Weight" required>
                    <input type="number" name="newWeight" placeholder="New Weight" required>
                    <input type="number" name="previousReps" placeholder="Previous Reps" required>
                    <input type="number" name="newReps" placeholder="New Reps" required>
                    <button type="submit">Log Progression</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Weight Progression</th>
                            <th>Reps Progression</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.progressEntries.map(entry => `
                            <tr>
                                <td>${entry.exercise}</td>
                                <td>${entry.previousWeight} lbs → ${entry.newWeight} lbs</td>
                                <td>${entry.previousReps} reps → ${entry.newReps} reps</td>
                                <td>${Utils.formatDate(entry.date)}</td>
                                <td>
                                    <button onclick="progressTracker.deleteEntry('${entry.id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('progress-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.addProgressEntry({
                exercise: formData.get('exercise'),
                previousWeight: formData.get('previousWeight'),
                newWeight: formData.get('newWeight'),
                previousReps: formData.get('previousReps'),
                newReps: formData.get('newReps')
            });
        });
    }
}

const progressTracker = new ProgressTracker();