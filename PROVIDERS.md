# Use Coastal Conditions with your assistant

Pair NOAA tide predictions with the latest buoy readings for a beach, inlet, or harbor.

## ChatGPT and Codex

[Download the full portable package](https://raw.githubusercontent.com/OpZero-sh/coastal-conditions-plugin/downloads/coastal-conditions.zip). The full ZIP includes all connections for clients that support multi-server packages. ChatGPT’s developer dashboard connects one remote server per plugin. Use these individually packaged connections there. Each includes a workflow for that service.

[Tide Times](https://raw.githubusercontent.com/OpZero-sh/coastal-conditions-plugin/downloads/coastal-conditions--tides.zip) · [Marine Conditions](https://raw.githubusercontent.com/OpZero-sh/coastal-conditions-plugin/downloads/coastal-conditions--buoys.zip)

For a publisher or developer setup, open the OpenAI developer dashboard, choose **Upload plugin**, upload the one-connection ZIP and connect the declared MCP endpoint. People with an existing directory listing can install it directly in ChatGPT. For an OAuth-protected service select OAuth and complete its browser sign-in. Choose no authentication for a public service. The builder is not in this repository. To rebuild the archives, clone [OpZero-sh/plugins](https://github.com/OpZero-sh/plugins) beside this checkout and run `python3 ../plugins/tools/build_openai.py dist` from this checkout.

[OpenAI package guide](https://developers.openai.com/plugins/build/plugins) · [Upload and connection setup](https://developers.openai.com/plugins/deploy/submission)

## Claude

In Claude Code run `/plugin marketplace add OpZero-sh/plugins`, then `/plugin install coastal-conditions@opzero`. In Claude chat or Cowork, add the OpZero marketplace if available to your account and connect the services in the installed plugin’s **Connectors** tab.

## Grok Build

From a checkout of this repository, run `grok plugin validate .` and `grok plugin install .`. View installed capabilities with `grok plugin details coastal-conditions`. Grok Build reads the Claude-compatible plugin, its skills and MCP configuration. [Grok Build plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces)

## Grok API

Preview a request locally with Python 3. The example script is not in this repository. Clone [OpZero-sh/plugins](https://github.com/OpZero-sh/plugins) beside this checkout and run the command below from this checkout. Add `XAI_API_KEY` in your environment and omit `--dry-run` to send it. Use `--model` to select a model enabled for your account. The example requests a focused set of product tools; its tool list is in [grok-servers.json](integrations/grok-servers.json).

```sh
python3 ../plugins/tools/grok_example.py --dry-run 'Use Coastal Conditions to check tides and buoy readings'
```

[Remote MCP tools in the xAI API](https://docs.x.ai/developers/tools/remote-mcp)

## Muse Code

From the repository root, validate and install the native plugin. Approve its public MCP connections, then start a new Muse session.

```sh
muse plugins validate .
muse plugins install .
muse plugins approve coastal-conditions
```

[Muse Code plugins](https://meta-models.github.io/muse-code-sdk/next/guides/plugins/reference/manifest/)
