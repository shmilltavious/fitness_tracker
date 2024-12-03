class MeasurementsTracker {
    constructor() {
        this.measurements = Utils.getFromStorage('bodyMeasurements', {
            height: null,
            weight: []
        });
    }

    updateHeight(height) {
        this.measurements.height = height;
        Utils.saveToStorage('bodyMeasurements', this.measurements);
        this.renderMeasurements();
    }

    addWeightEntry(weight) {
        this.measurements.weight.push({
            value: weight,
            date: new Date().toISOString()
        });
        Utils.saveToStorage('bodyMeasurements', this.measurements);
        this.renderMeasurements();
    }

    deleteWeightEntry(date) {
        this.measurements.weight = this.measurements.weight.filter(w => w.date !== date);
        Utils.saveToStorage('bodyMeasurements', this.measurements);
        this.renderMeasurements();
    }

    renderMeasurements() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div id="measurements-tracker">
                <h2>Body Measurements</h2>
                <div>
                    <h3>Height</h3>
                    <form id="height-form">
                        <input type="number" name="height" placeholder="Height (inches)" 
                               value="${this.measurements.height || ''}" required>
                        <button type="submit">Update Height</button>
                    </form>
                </div>
                <div>
                    <h3>Weight Log</h3>
                    <form id="weight-form">
                        <input type="number" name="weight" placeholder="Weight (lbs)" required>
                        <button type="submit">Log Weight</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Weight</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.measurements.weight.map(entry => `
                                <tr>
                                    <td>${entry.value} lbs</td>
                                    <td>${Utils.formatDate(entry.date)}</td>
                                    <td>
                                        <button onclick="measurementsTracker.deleteWeightEntry('${entry.date}')">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('height-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.updateHeight(formData.get('height'));
        });

        document.getElementById('weight-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.addWeightEntry(formData.get('weight'));
        });
    }
}

const measurementsTracker = new MeasurementsTracker();