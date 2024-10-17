# Extending the Gauge List

This README provides instructions for third parties on how to extend the gauge list in our application. By following these steps, you can add your gauge to the public repository, making it visible and accessible within our app.

## Prerequisites

Before you begin, ensure you have:

1. A GitHub account
2. Basic knowledge of JSON and Git
3. Your gauge's details ready
4. Knowledge of which network you're adding the gauge for

## Steps to Add Your Gauge

### 1. Prepare Necessary Asset Files

Before making changes to the JSON files, prepare any new or missing asset files:

- You only need to provide assets if they're not already in the `src/assets` folder or if you're introducing new elements (e.g., a new protocol or token).
- For any new or missing assets:
  - Use SVG format preferably.
  - If SVG is too complex, use a 128x128 PNG instead.
  - Place new asset files in the `src/assets` folder.

**Note**: The SVG/PNG rule applies to all assets, including gauge LP token logos, protocol logos, and token logos.

### 2. Update JSON Files

1. Fork the repository to your GitHub account.

2. Clone your forked repository to your local machine.

3. Navigate to the `src/gauges/{network}/defaultGaugeList.json` file, where `{network}` is the network you're adding the gauge for (e.g., "bartio" for the Bartio testnet).

4. Add your gauge to the `gauges` array in the JSON file. Follow this structure:

   ```json
   {
     "lpTokenAddress": "0x...",
     "beraRewardsVault": "0x...",
     "name": "Your Gauge Name",
     "protocol": "your_protocol_id",
     "url": "https://your-protocol-url.com/provide-liquidity",
     "types": ["type1", "type2"],
     "underlyingTokens": ["0x...", "0x..."],
     "logo": "your-logo-filename.svg" // Optional
   }
   ```

   Ensure that:

   - `protocol` matches an `id` in the `protocols` array
   - `types` contains valid types from the `types` object
   - All `underlyingTokens` are listed in the token list (`src/tokens/{network}/defaultTokenList.json`)
   - The `url` field is a direct link to provide liquidity for the LP token
   - The `logo` field is optional. Only add it if you've placed a new logo file in the `src/assets` folder

   **Important**: If you don't provide a logo for the LP token, the app will automatically display the logos of the underlying tokens instead. This can be useful for visually representing the composition of the LP token.

5. If your protocol is not listed in the `protocols` array, add it:

   ```json
   {
     "name": "Your Protocol Name",
     "logo": "your-protocol-logo.svg",
     "url": "https://your-protocol-url.com",
     "description": "A brief description of your protocol.",
     "id": "your_unique_protocol_id"
   }
   ```

   Ensure you've added the protocol logo to the `src/assets` folder if it's not already there.

6. If your gauge uses tokens not in the token list, add them to `src/tokens/{network}/defaultTokenList.json`:

   ```json
   {
     "chainId": 80084,
     "address": "0x...",
     "symbol": "XYZ",
     "name": "Your Token Name",
     "decimals": 18,
     "logo": "your-token-logo.svg",
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
  - Use SVG format preferably, or 128x128 PNG if SVG is too complex.
  - Ensure they are high-quality and properly sized.
- Test your changes by running `npm install && npm run validate` locally before submitting the PR.
- Make sure you're updating the correct network-specific files (replace `{network}` with the appropriate network name).

## Review Process

After submitting your PR:

1. Our team will review your submission.
2. We may request changes or clarifications if needed.
3. Once approved, your gauge will be merged into the main list and become visible in the app for the specified network.

Thank you for contributing to our ecosystem!
