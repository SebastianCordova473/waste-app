## Project wastes-app

This project consists of a React application that fetches data from a remote API and displays waste-related information, strategies, and sales analysis charts. The application communicates with the API to retrieve the necessary data for rendering the components.

### Components

The application includes the following components:

#### 1. `App`

The main component of the application. It fetches data from the API and manages the loading state. Once the data is loaded, it renders the following components:

- `Wastes`: Displays waste-related information retrieved from the API.
- `WastePrediction`: Displays waste prediction based on the fetched data.
- `Strategies`: Renders effective strategies based on the fetched data.
- `SalesAnalysisChart`: Renders a sales analysis chart based on the fetched data.

#### 2. `Wastes`

This component fetches waste data from the API and displays it in a list format. It sorts the data by month and calculates the percentage difference between each month's waste value and the previous month's value.

#### 3. `Strategies`

This component receives data from the parent component and generates effective strategies based on the provided data. It checks if there are any effective strategies available and renders them accordingly. Each strategy includes its name, improvement percentage, categories, subcategories, and associated product images.

#### 4. `DownloadedImage`

A reusable component that displays an image downloaded from a URL.

### API Interaction

The application interacts with the API by making HTTP requests to fetch the required data. It uses the `fetch` function to send a GET request to the specified API endpoint. The received JSON response is then processed and used to update the state of the corresponding components.

### Setup and Execution

To run the application locally, follow these steps:

1. Make sure you have Node.js and npm installed on your machine.

2. Clone the project repository to your local machine.

3. Navigate to the project directory in your terminal.

4. Install the project dependencies by running the following command:

   ```
   npm install
   ```

5. Start the application with the following command:

   ```
   npm start
   ```

6. Access the application in your web browser at `http://localhost:5173`.

Please note that you need a stable internet connection to successfully fetch data from the remote API.

# Waste Statistics

![Wastes Reduction](https://res.cloudinary.com/df9aeptyn/image/upload/v1683922750/merma-app/Screenshot_2023-05-12_at_13.58.12_ds9q9a.png)

**April**: The total waste for April was 1592 units (this could be in tons, kilograms, or another measurement depending on the context). This is a decrease of 53.15% compared to the amount of waste in March.

**March**: The total waste for March was 3398 units. This is an increase of 75.70% compared to the amount of waste in February.

**February**: The total waste for February was 1934 units. This is a decrease of 91.54% compared to the amount of waste in January.

**January**: The total waste for January was 22853 units. There is no percentage change provided because there's no data for the previous month (December of the previous year) in the list you've given.

#Prediction of Wastes

![Wastes Prediction](https://res.cloudinary.com/df9aeptyn/image/upload/v1683929148/Screenshot_2023-05-12_at_15.56.21_ew3qou.png)

**Predicted Amount of Waste**: The model predicts that the amount of waste will be approximately $4606.4235079196915. This value represents the estimated quantity of waste expected based on the input data and the model's calculations.

**Mean Squared Error (MSE)**: The mean squared error is a measure of the average squared difference between the predicted values and the actual values. In this case, the MSE is extremely small, represented as 8.132530390782695e-27 (a very small number close to zero). A lower MSE indicates that the model's predictions closely match the actual values.

**R-Squared (R²)**: The R-squared value, also known as the coefficient of determination, measures the proportion of the variance in the dependent variable (waste in this case) that can be explained by the independent variables used in the model. An R-squared value of 1.000000000000106 indicates that the model explains all of the variance in the waste data, suggesting a perfect fit between the predicted values and the actual values.

#Strategies
![Strategies](https://res.cloudinary.com/df9aeptyn/image/upload/v1683935418/Screenshot_2023-05-12_at_18.48.51_wcv2fg.png)

#Analysis
![Analysis](https://res.cloudinary.com/df9aeptyn/image/upload/v1683935499/Screenshot_2023-05-12_at_18.51.08_mrdhs6.png)
