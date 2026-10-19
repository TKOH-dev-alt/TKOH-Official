# TKHO — The Key of Happiness & Openness

TKHO is a therapist discovery and booking product with an AI companion and a separate therapist dashboard.

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server.

The public patient site is in the project root. The therapist portal is available at:

`Dr. Dashboard/therapist-dashboard.html`

## Deployment

This project is suitable for Azure Static Web Apps. The repository includes an Azure-generated GitHub Actions workflow under `.github/workflows/` that deploys the frontend and `api/` Functions.

### Azure Static Web Apps setup

1. In the Azure portal, create a **Static Web App** using the **Free** plan.
2. Select GitHub and choose `TKHO-dev-alt/TKHO-Official`.
3. Set the branch to `master`, app location to `/`, and leave the API and output locations empty.
4. Azure will create a resource-specific deployment secret and reference it from the generated workflow. If you create the resource manually, regenerate or update the workflow from the Static Web Apps deployment settings.
5. After the first deployment, open **Custom domains** in the Static Web App and add your Get.tech domain.
6. At Get.tech, add the DNS records shown by Azure. Use the validation CNAME first; then add the final CNAME or ALIAS record Azure provides.

## Backend foundation

The repository now includes an Azure Functions API under `api/` and a `staticwebapp.config.json` file:

- `GET/PUT /api/profile` — authenticated user profile
- `GET/POST /api/moods` — authenticated mood entries
- `GET/POST /api/bookings` — authenticated booking requests
- `GET /api/therapists` — approved therapist directory
- `POST /api/therapist-applications` — therapist application metadata and review status

The API reads the authenticated Static Web Apps `x-ms-client-principal` header and never accepts a user ID from the browser. It stores records in Azure Cosmos DB using managed application configuration values.

### Required Azure configuration

1. Create an Azure Cosmos DB account using a low-cost/serverless option.
2. Create these Static Web App application settings: `COSMOS_ENDPOINT`, `COSMOS_KEY`, `COSMOS_DATABASE` (for example `tkho`), and `COSMOS_CONTAINER` (for example `app`).
3. Configure Microsoft Entra External ID (customer/consumer tenant) as the Static Web Apps authentication provider. The public app uses `/.auth/login/aad` and `/.auth/me`; do not use browser-side passwords for real accounts.
4. Add the Static Web App authentication callback URL shown by Azure to the Entra application registration, then test sign-in and sign-out on the deployed custom domain.
5. Create therapist records with `approved: true` only after an administrator verifies credentials and handles the application review.

Do not place Cosmos keys or other secrets in frontend JavaScript, GitHub source files, or `local.settings.json`. Use Azure application settings or Key Vault references. The demo patient account remains only for preview; production signup/login is delegated to Azure and no user password is stored by TKHO.
