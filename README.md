# Extending the gauge list

This README provides instructions for third parties on how to extend the gauge list in our application. By following these steps, you can add your gauge to the public repository, making it visible and accessible within our app.

## Prerequisites

Before you begin, ensure you have:

1. A GitHub account
2. Basic knowledge of JSON and Git
3. Your gauge's details ready
4. Knowledge of which network you're adding the gauge for

## Steps to add your gauge

### 1. Prepare necessary asset files

Before making changes to the JSON files, prepare any new or missing asset files:

- You only need to provide assets if they're not already in the `src/assets` folder or if you're introducing new elements (e.g., a new protocol or token).
- For any new or missing assets:
  - You should use an SVG file. If you have one:
    - Add the svg to `src/assets`.
    - Run `pnpm clean-assets`.
  - If SVG is too complex:
    - Add an unmodified png image to `src/assets/original`.
    - Resize the png to 128x128. There are several tools on Google via "resize png".
    - Convert the png to `webp`. There are several tools on Google via "png to webp". We commonly use https://cloudconvert.com and https://convertio.co/png-webp.
    - Place new asset files in the `src/assets` folder.

**Note**: The SVG/PNG rule applies to all assets, including gauge LP token logos, protocol logos, and token logos.

### 2. Update JSON files

1. Fork the repository to your GitHub account.

2. Clone your forked repository to your local machine.

3. Navigate to the `src/gauges/{network}/defaultGaugeList.json` file, where `{network}` is the network you're adding the gauge for (e.g., "bartio" for the Bartio testnet).

4. Add your gauge to the `gauges` array in the JSON file. Follow this structure:

   ```json
   {
     "beraRewardsVault": "0x...",
     "lpTokenAddress": "0x...",
     "logo": "your-logo-filename.svg" // Optional
     "name": "Your Gauge Name",
     "protocol": "your_protocol_id",
     "types": ["type1", "type2"],
     "underlyingTokens": ["0x...", "0x..."],
     "url": "https://your-protocol-url.com/provide-liquidity"
   }
   ```

   Ensure that:

   - `protocol` matches an `id` in the `protocols` array
   - `types` contains valid types from the `types` object
   - All `underlyingTokens` are listed in the token list (`src/tokens/{network}/defaultTokenList.json`)
   - The `url` field is a direct link to provide liquidity for the LP token
   - The `logo` field is optional. Only add it if you've placed a new logo file in the `src/assets` folder

5. If your protocol is not listed in the `protocols` array, add it:

   ```json
   {
     "description": "A brief description of your protocol.",
     "id": "your_unique_protocol_id",
     "logo": "your-protocol-logo.svg",
     "name": "Your Protocol Name",
     "url": "https://your-protocol-url.com"
   }
   ```

   Ensure you've added the protocol logo to the `src/assets` folder if it's not already there.

6. If your gauge uses tokens not in the token list, add them to `src/tokens/{network}/defaultTokenList.json`:

   ```json
   {
     "address": "0x...",
     "chainId": 80084,
     "decimals": 18,
     "logo": "your-token-logo.svg",
     "name": "Your Token Name",
     "symbol": "XYZ",
     "tags": ["tag1", "tag2"]
   }
   ```

   Add the token logo to the `src/assets` folder if it's not already present.

7. Commit your changes and push to your forked repository.

8. Create a Pull Request (PR) from your fork to the main repository.

## Guidelines

- Ensure all addresses are valid and correctly formatted.
- Use clear, descriptive names for your gauge, protocol, and tokens.
- Provide accurate and concise descriptions.
- Use appropriate tags and types.
- The `url` field for gauges should be a direct link to provide liquidity for the LP token.
- Only add new logo files if they're not already in the `src/assets` folder.
- For any new logo files:
  - Use SVG format preferably, or PNG (WEBP) if SVG is too complex.
  - Ensure they are high-quality and properly sized.
- Test your changes by running `pnpm i && pnpm validate` locally before submitting the PR.
- Make sure you're updating the correct network-specific files (replace `{network}` with the appropriate network name).

## Review process

After submitting your PR:

1. Our team will review your submission.
2. We may request changes or clarifications if needed.
3. Once approved, your gauge will be merged into the main list and become visible in the app for the specified network.

Thank you for contributing to our ecosystem!
