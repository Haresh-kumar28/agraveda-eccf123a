<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes for public pages and the `/app` layout; keep shared visual and operational view components outside routes so navigation and metadata remain framework-native.
- Preserve the six upstream AgraVeda calculation engines and their shared typed input pipeline; only compatibility guards may change engine code without an explicit modeling request.
- Centralize editable inputs and isolated what-if parameters in OperationsProvider so every operational screen uses the same calculated state.
- Keep demo identity behind AuthService and AuthProvider, using sessionStorage only for labelled demo sessions; production identity and server authorization must replace this service before private data is introduced.
- Use semantic CSS tokens and the shared Button for interactive controls so public and application views stay consistent.
- Generate reproducible synthetic records with a reset seed and fixed UTC fixture date so SSR, tests and the browser agree.
