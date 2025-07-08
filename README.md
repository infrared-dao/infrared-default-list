# Extending vaults, tokens, or validators

This README provides instructions for third parties on how to add their vault, token, or validator to our application.

## Prerequisites

Before you begin, ensure you have:

1. A GitHub account
2. Basic knowledge of JSON and Git
3. Details for your vault, token, or validator

Please make sure that the respective beraRewardsVault is whitelisted. In order to check that please follow the guideline:

1. Go to Berachef’s contract on Berascan(0xdf960E8F3F19C481dDE769edEDD439ea1a63426a) & select “Read Contract“
2. Go to function 16. isWhitelistedVault
3. Under receiver parameter put the beraRewardsVault address
4. Click “Query“
5. If the boolean is “true”, the vault is yielding BGT (desired path)
6. If the boolean is “false”, the vault is not yielding BGT. In this case, please refer to the Berachain team, their governance, and their documentation

## Steps to add

### 1. Fork the repository

### 2. Use semantic commit messages

When adding a new vault or token use a message such as

```
feat: add WBERA-HONEY vault
```

### 2. Add your assets

You only need to provide assets if they're not already in the `src/assets` folder or if you're introducing new elements (e.g., a new protocol or token). For any new or missing assets:

Add any new token assets to `/src/assets/tokens` and new protocol assets to `src/assets/protocols`.

- You should use a high quality SVG file (no base64).
- If you absolutely do not have an SVG file add a png to `src/assets/tokens/new` or `src/assets/protocols/new`. Ensure it is larger than 128x128 and is very high quality. This process will take more time as the team will convert the assets to svg.

### 3. Update JSON files

1. Navigate to `src/vaults/{network}.json` where `{network}` is the network you're adding to (e.g., "mainnet" for the Berachain mainnet).

2. Add your vault to the `vaults` array in the JSON file. Follow this structure:

   ```json
   {
     "beraRewardsVault": "0x...",
     "depositTokenAddress": "0x...",
     "slug": "protocol-stake-token-name",
     "stakeTokenAddress": "0x..."
   }
   ```

3. If your protocol is not listed in the `protocols` array, add it:

   ```json
   {
     "description": "A brief description of your protocol.",
     "id": "your_unique_protocol_id",
     "imageDark": "your-protocol-image.svg",
     "imageLight": "your-protocol-image.svg",
     "name": "Protocol",
     "url": "https://your-protocol-url.com"
   }
   ```

   Ensure that:
   - The `id` field is lowercase.
   - The `name` field is a singular word in most cases. `Kodiak` instead of `Kodiak Finance` for example.
   - You've added the protocol image to the `src/assets/protocols` folder if it's not already there.

4. If your vault uses tokens not in the tokens, add them to `src/tokens/{network}.json`:

   ```json
   {
     "address": "0x...",
     "decimals": 18,
     "image": "your-token-image.svg",
     "mintUrl": "https://your-protocol-url.com/provide-liquidity",
     "name": "XYZ",
     "protocol": "your_protocol_id",
     "symbol": "XYZ",
     "type": "amm",
     "underlyingTokens": ["0x...", "0x..."]
   }
   ```

   Ensure that:
   - The `mintUrl` field is a direct link to provide liquidity for the LP token
   - The `name` field only uses the symbols of the underlying tokens with a dash between. Example: `HONEY-WBERA`.
   - `protocol` matches an `id` in the `protocols` array
   - You've added the token image to the `src/assets/tokens` folder if it's not already there.
   - All `underlyingTokens` are listed in the tokens (`src/tokens/{network}.json`)

5. Commit your changes and push to your forked repository.

6. Create a Pull Request (PR) from your fork to this repository.

## Guidelines

- Ensure all addresses are valid and correctly formatted.
- Use clear, descriptive names for your vault, protocol, and tokens.
- Provide accurate and concise descriptions.
- Use appropriate tags and types.
- The `url` field for vaults should be a direct link to provide liquidity for the LP token.
- Make sure you're updating the correct network-specific files (replace `{network}` with the appropriate network name).

## Review process

After submitting your PR:

1. Our team will review your submission.
2. We may request changes or clarifications if needed.
3. Once approved, your changes will be merged and become visible in the app for the specified network.

Thank you for contributing to our ecosystem!

## Converting assets from png to svg

1. Try to convert the image by adding it to `src/assets/tokens/new` and then using https://vectormagic.com or running `pnpm convert-new-assets-to-svg`
2. If that doesn't produce a good result:
   1. Add the image to a figma file
   2. Resize it down to 256px x 256px. If it is smaller, leave it
   3. Export the image as a png
   4. Use https://tinypng.com to compress the image
   5. Add the compressed image to figma
   6. Resize it to 128px x 128px
   7. Copy & paste as SVG
   8. Add the file to this repo
