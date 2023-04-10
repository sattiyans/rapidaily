// Load the data from data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Get references to the select element and chart canvas
    const select = document.getElementById("month-select");
    const canvas = document.getElementById("chart");

    // Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Populate the select element with the previous and current months
    for (let i = 1; i <= currentMonth; i++) {
      if (i === 1) {
        // January of the current year
        const option = document.createElement("option");
        option.value = 1;
        option.text = new Date(`${currentYear}-01-01`).toLocaleDateString(
          "en-US",
          { month: "long" }
        );
        select.appendChild(option);
      } else {
        // Other months
        const option = document.createElement("option");
        option.value = i;
        option.text = new Date(`${currentYear}-${i}-01`).toLocaleDateString(
          "en-US",
          { month: "long" }
        );
        select.appendChild(option);
      }
    }

    // Set the default selected month to the current month
    select.value = currentMonth;

    // Filter the data to include only dates within the current month
    const filteredData = data.filter((d) => {
      const date = new Date(d.date);
      return (
        date.getMonth() === currentMonth - 1 &&
        date.getFullYear() === currentYear
      );
    });

    console.log("filteredData", filteredData);

    // Check if there is any data for the selected month
    const isDataAvailable = filteredData.length > 0;

    console.log("isDataAvailable", isDataAvailable);

    if (!isDataAvailable) {
      console.log("showing no data element");
      document.getElementById("no-data").style.display = "block";
    }

    // Hide the chart if there is no data for the selected month
    if (!isDataAvailable) {
      console.log("hiding chart");
      canvas.style.display = "none";
    }

    // Create the chart object
    let chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: filteredData.map((d) =>
          new Date(d.date).toLocaleDateString("en-US", { day: "2-digit" })
        ),
        datasets: [
          {
            label: "Issue Count",
            data: filteredData.map((d) => d.issue_count),
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "blue",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category", // Set the x-axis type to "category"
          },
          y: {
            beginAtZero: true,
            precision: 0,
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              },
            },
          },
        },
      },
    });

    // Add an event listener to the select element
    select.addEventListener("change", () => {
      // Get the selected month from the value of the select element
      const selectedMonth = Number(select.value);

      // Filter the data to include only dates within the selected month
      const filteredData = data.filter((d) => {
        const date = new Date(d.date);
        return (
          date.getMonth() === selectedMonth - 1 &&
          date.getFullYear() === currentYear
        );
      });

      if (filteredData.length === 0 && selectedMonth !== currentMonth) {
        // If there is no data for the selected month, hide the chart and show the no-data element
        document.getElementById("no-data").style.display = "block";
        canvas.style.display = "none";
      } else {
        // If there is data for the selected month, show the chart and hide the no-data element
        canvas.style.display = "block";
        document.getElementById("no-data").style.display = "none";

        // Sort the filteredData array by date
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Update the chart with the filtered data
        chart.data.labels = filteredData.map((d) =>
          new Date(d.date).toLocaleDateString("en-US", { day: "2-digit" })
        );
        chart.data.datasets[0].data = filteredData.map((d) => d.issue_count);
        chart.update();
      }
    });
  });
