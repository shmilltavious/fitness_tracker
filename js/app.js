class FitnessApp {
    constructor() {
        this.initializeNavigation();
        this.loadInitialView();
    }

    initializeNavigation() {
        document.getElementById('workouts-btn').addEventListener('click', () => workoutTracker.renderWorkouts());
        document.getElementById('progress-btn').addEventListener('click', () => progressTracker.renderProgress());
        document.getElementById('measurements-btn').addEventListener('click', () => measurementsTracker.renderMeasurements());
    }

    loadInitialView() {
        workoutTracker.renderWorkouts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FitnessApp();
});