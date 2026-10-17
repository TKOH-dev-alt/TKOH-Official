# TKOH Wellness

TKOH Wellness is a static mental wellness website with patient tools, therapist discovery, and a separate therapist dashboard.

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server.

The public patient site is in the project root. The therapist portal is available at:

`Dr. Dashboard/therapist-dashboard.html`

## Deployment

This project is suitable for Azure Static Web Apps. The repository includes a GitHub Actions workflow at `.github/workflows/azure-static-web-apps.yml`.

### Azure Static Web Apps setup

1. In the Azure portal, create a **Static Web App** using the **Free** plan.
2. Select GitHub and choose `TKOH-dev-alt/TKOH-Official`.
3. Set the branch to `master`, app location to `/`, and leave the API and output locations empty.
4. Azure will create the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub secret. If you create the resource manually, copy its deployment token into that repository secret.
5. After the first deployment, open **Custom domains** in the Static Web App and add your Get.tech domain.
6. At Get.tech, add the DNS records shown by Azure. Use the validation CNAME first; then add the final CNAME or ALIAS record Azure provides.

The current login and sign-up screens are frontend demo behavior. Real account authentication, password storage, bookings, and clinical data require a backend and a production identity provider before launch.
