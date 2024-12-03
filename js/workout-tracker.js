class WorkoutTracker {
    constructor() {
        this.workouts = Utils.getFromStorage('workouts');
    }

    addWorkout(workout) {
        const newWorkout = {
            ...workout,
            id: Utils.generateId(),
            date: new Date().toISOString()
        };
        this.workouts.push(newWorkout);
        Utils.saveToStorage('workouts', this.workouts);
        this.renderWorkouts();
    }

    deleteWorkout(id) {
        this.workouts = this.workouts.filter(w => w.id !== id);
        Utils.saveToStorage('workouts', this.workouts);
        this.renderWorkouts();
    }

    renderWorkouts() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div id="workout-tracker">
                <h2>Workout Log</h2>
                <form id="workout-form">
                    <input type="text" name="exercise" placeholder="Exercise" required>
                    <input type="number" name="sets" placeholder="Sets" required>
                    <input type="number" name="reps" placeholder="Reps" required>
                    <input type="number" name="weight" placeholder="Weight (lbs)" required>
                    <button type="submit">Log Workout</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.workouts.map(workout => `
                            <tr>
                                <td>${workout.exercise}</td>
                                <td>${workout.sets}</td>
                                <td>${workout.reps}</td>
                                <td>${workout.weight} lbs</td>
                                <td>${Utils.formatDate(workout.date)}</td>
                                <td>
                                    <button onclick="workoutTracker.deleteWorkout('${workout.id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('workout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.addWorkout({
                exercise: formData.get('exercise'),
                sets: formData.get('sets'),
                reps: formData.get('reps'),
                weight: formData.get('weight')
            });
        });
    }
}

const workoutTracker = new WorkoutTracker();
