# code-review-unity

> Claude Code skill for reviewing Unity C# code against [Unity's Official C# Style Guide (Unity 6 Edition)](https://unity.com/resources/c-sharp-style-guide-unity-6/).

[![npm version](https://badge.fury.io/js/code-review-unity.svg)](https://www.npmjs.com/package/code-review-unity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Multiple review modes** — Review a single file, your local `git diff`, or a GitHub PR by URL.
- **Follow Unity 6 C# style guide** — Naming (PascalCase/camelCase, booleans as questions), SRP, DRY, KISS, comments (why not what), YAGNI, extension methods, and UI Toolkit BEM naming.
- **Unity-specific checks** — MonoBehaviour lifecycle (Awake/Start/OnEnable/OnDestroy), coroutine patterns, ScriptableObject usage, and API misuse (e.g. `GetComponent` in Update, `CompareTag`, non-alloc physics, pooling).
- **Performance and GC** — Flags allocation in hot paths (strings, LINQ, boxing), Update bloat, and common anti-patterns (`SendMessage`, `Invoke`, `FindObjectOfType` in hot paths).
- **Structured output** — Critical issues, style violations, and suggestions with file:line refs and concrete fix examples.

---

## Install
### Option 1: npx installs for Claude Code
```bash
npx code-review-unity
```
### Option 2: Use [Skill.sh](https://skills.sh/) to install and manage for all your AI Agents: Claude Code, Cursor, Gemini CLI...
```bash
npx skills add https://github.com/jinda-li/code-review-unity --skill code-review-unity
```
### Option 3: Mannual

Copy `.claude/skills/code-review-unity/` to `~/.claude/skills/`

---

## Usage

### Command Invocation

```
/code-review-unity Assets/Scripts/PlayerController.cs
```

Or review git changes:

```
/code-review-unity
```

or Just ask claude code:

```
"Review this Unity script"
```

Claude will automatically invoke this skill and review your code.

---

## Example Output

```markdown
## Code Review: PlayerController.cs

### Critical Issues

1. **SRP Violation - God Class** (lines 15-89)
   - Handles input, movement, audio, and inventory
   - Unity Style Guide: "Each MonoBehaviour should have one responsibility"
   - Split into: PlayerInput, PlayerMovement, PlayerAudio, PlayerInventory

2. **GetComponent in Update** (line 34)
   - Caching pattern not used - causes unnecessary overhead every frame
   - Use `[SerializeField]` or cache in `Awake()`

### Style Violations

3. **Poor Variable Naming** (line 23)
   - `int d` should be `int elapsedTimeInDays` - be specific about units
   - `bool dead` should be `bool isDead` - booleans ask questions
```

---

## Resources

- [C# Style Guide (Unity 6)](https://unity.com/resources/c-sharp-style-guide-unity-6/) - Official style guide for clean, scalable code
- [Unity How-To Library](https://unity.com/how-to) - Tutorials on scripting, optimization, and best practices

---

## Links

- [GitHub](https://github.com/jinda-li/code-review-unity)
- [npm](https://www.npmjs.com/package/code-review-unity)

---

## License

MIT
