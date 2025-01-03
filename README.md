# Extending the gauge, token, or validator lists

This README provides instructions for third parties on how to add their gauge, token, or validator to our application.

## Prerequisites

Before you begin, ensure you have:

1. A GitHub account
2. Basic knowledge of JSON and Git
3. Details for your gauge, token, or validator

Please make sure that the respective beraRewardsVault is friendoftheChef. In order to check that please follow the guideline:

1. Go to Berachef’s contract on beratrail & select “Read Contract“
2. Go to function 9. isFriendoftheChef
3. Under receiver parameter put the beraRewardsVault address
4. Click “Query“
5. If the boolean is “true”, the vault is yielding BGT (desired path)
6. If the boolean is “false”, the vault is not yielding BGT. In this case, please refer to the Berachain team, their governance, and their documentation

## Steps to add

### 1. Fork the repository

### 2. Add your assets

You only need to provide assets if they're not already in the `src/assets` folder or if you're introducing new elements (e.g., a new protocol or token). For any new or missing assets:

Add any new token assets to `/src/assets/tokens` and new protocol assets to `src/assets/protocols`.

- You should use an SVG file.
- If you absolutely do not have an SVG file add a png to `src/assets/tokens/new` or `src/assets/protocols/new`. Ensure it is larger than 128x128 and is very high quality.

### 3. Update JSON files

1. Navigate to `src/gauges/{network}.json` where `{network}` is the network you're adding to (e.g., "bartio" for the Bartio testnet).

2. Add your gauge to the `gauges` array in the JSON file. Follow this structure:

   ```json
   {
     "beraRewardsVault": "0x...",
     "lpTokenAddress": "0x...",
     "mintUrl": "https://your-protocol-url.com/provide-liquidity",
     "name": "HONEY-WBERA",
     "protocol": "your_protocol_id",
     "types": ["type1", "type2"],
     "underlyingTokens": ["0x...", "0x..."]
   }
   ```

   Ensure that:

   - The `mintUrl` field is a direct link to provide liquidity for the LP token
   - The `name` field only uses the symbols of the underlying tokens with a dash between. Example: `HONEY-WBERA`.
   - `protocol` matches an `id` in the `protocols` array
   - `types` contains valid types from the `types` object
   - All `underlyingTokens` are listed in the token list (`src/tokens/{network}.json`)

3. If your protocol is not listed in the `protocols` array, add it:

   ```json
   {
     "description": "A brief description of your protocol.",
     "id": "your_unique_protocol_id",
     "image": "your-protocol-image.svg",
     "name": "Protocol",
     "url": "https://your-protocol-url.com"
   }
   ```

   Ensure that:

   - The `id` field is lowercase.
   - The `Name` field is a singular word in most cases. `Kodiak` instead of `Kodiak Finance` for example.
   - You've added the protocol image to the `src/assets/protocols` folder if it's not already there.

4. If your gauge uses tokens not in the token list, add them to `src/tokens/{network}.json`:

   ```json
   {
     "address": "0x...",
     "chainId": 80084,
     "decimals": 18,
     "image": "your-token-image.svg",
     "name": "Your Token Name",
     "symbol": "XYZ",
     "tags": ["tag1", "tag2"]
   }
   ```

   Add the token image to the `src/assets/tokens` folder if it's not already present.

5. Commit your changes and push to your forked repository.

6. Create a Pull Request (PR) from your fork to this repository.

## Guidelines

- Ensure all addresses are valid and correctly formatted.
- Use clear, descriptive names for your gauge, protocol, and tokens.
- Provide accurate and concise descriptions.
- Use appropriate tags and types.
- The `url` field for gauges should be a direct link to provide liquidity for the LP token.
- Make sure you're updating the correct network-specific files (replace `{network}` with the appropriate network name).

## Review process

After submitting your PR:

1. Our team will review your submission.
2. We may request changes or clarifications if needed.
3. Once approved, your gauge will be merged into the main list and become visible in the app for the specified network.

Thank you for contributing to our ecosystem!

### Internal review process

If a `png`/`webp` image is submitted, ensure a `svg` has been generated. If not, ensure the assets are in the `assets/*/new` folder and run `convert-new-assets-to-svg`. If the svg looks good and is smaller than the webp then use it, otherwise use the webp.
