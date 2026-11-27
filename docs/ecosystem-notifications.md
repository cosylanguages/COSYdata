# Notifying the consumer repositories

COSYdata is the data layer. The rest of the ecosystem reads it, so when the data
changes the consumers need to know. That wire is
`.github/workflows/notify-consumers.yml`.

## What it does

On every push to `main` that touches `vocabulary/`, `functional-phrases/` or
`curriculum/`, the workflow sends a `repository_dispatch` event with
`event_type: vocabulary_updated` to each consumer:

```
COSYlanguages/COSYlanguages
COSYlanguages/COSYmanuals
COSYlanguages/COSYtools
COSYlanguages/COSYgames
COSYlanguages/COSYplatform
```

A consumer reacts with its own workflow:

```yaml
on:
  repository_dispatch:
    types: [vocabulary_updated]
```

The dispatch carries no payload. It says "the data moved", not what moved;
consumers re-read what they need. That keeps the event stable as the schema
evolves.

## The token

The default `GITHUB_TOKEN` cannot dispatch to other repositories, so the workflow
uses the `GH_PAT` secret. The token must be able to **write** every consumer
repository, because `repository_dispatch` is a write operation.

- Fine-grained PAT: `Contents: Read and write` on each of the five repositories.
- Classic PAT: the `repo` scope.

Set or replace it with:

```bash
gh secret set GH_PAT --repo cosylanguages/COSYdata
```

## How the workflow fails

It checks before it sends, so a broken token never half-notifies:

1. **Token present** — missing secret stops the run with a message naming the fix.
2. **Token valid** — `GET /user` must answer 200, and the login is printed.
3. **Access to all five consumers** — each is read, and its `push` permission is
   checked. One unreachable consumer stops the run before anything is dispatched.
4. **Dispatch** — each consumer is notified; every failure is collected, the job
   summary lists what was sent and what failed, and the run fails if any did.

A red run here is not noise: it means consumers are running on stale data. If
some consumers were notified before a failure, re-run the workflow
(`workflow_dispatch` is enabled) once the token is fixed; dispatch is idempotent
from the consumer's point of view.

## Checking by hand

```bash
# is the token valid?
curl -s -o /dev/null -w '%{http_code}\n' -H "Authorization: Bearer $GH_PAT" https://api.github.com/user

# can it write a consumer? (expect 204)
curl -s -o /dev/null -w '%{http_code}\n' -X POST \
  -H "Authorization: Bearer $GH_PAT" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/COSYlanguages/COSYtools/dispatches \
  -d '{"event_type":"vocabulary_updated"}'

# or just re-run the workflow
gh workflow run notify-consumers.yml --repo cosylanguages/COSYdata
```

## History worth knowing

Between 2026-11-26 and 2026-11-27 the workflow failed on every push because
`GH_PAT` was unset. Nothing surfaced it: the site kept deploying, validation
stayed green, and the only signal was a red X on a workflow nobody watched.
Consumers were never told the data had changed.

That is why the pre-flight now names the exact repositories it cannot reach, and
why the failure is loud instead of a single opaque step.
