# code-review-unity

> Claude Code skill for reviewing Unity C# code against [Unity's Official C# Style Guide (Unity 6 Edition)](https://unity.com/resources/c-sharp-style-guide-unity-6/).

[![npm version](https://badge.fury.io/js/code-review-unity.svg)](https://www.npmjs.com/package/code-review-unity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why Follow Unity's Style Guide?

Following Unity's official C# style guide brings significant benefits for Unity development:

### 🚀 Performance & Stability
- **Clean code runs better** - Well-organized code is easier to profile and optimize
- **Avoid common pitfalls** - The guide helps you sidestep Unity-specific traps like GC allocation in Update, improper coroutine patterns, and MonoBehaviour lifecycle misuse
- **Catching bugs early** - Consistent naming and structure make null reference errors and API misuse more visible

### 🤝 Team Collaboration
- **Readable by anyone** - Team members can jump into any script and understand it quickly
- **Faster code reviews** - Common conventions mean reviewers focus on logic, not formatting
- **Easier onboarding** - New developers get up to speed faster with consistent patterns

### 🔧 Maintainability
- **Small, focused classes** - Following SRP for MonoBehaviours makes changes safer and faster
- **Less duplication** - DRY principles reduce the surface area for bugs
- **Self-documenting code** - Good naming reduces the need for excessive comments

### 🎮 Unity-Specific Advantages
- **Correct lifecycle usage** - Knowing when to use `Awake` vs `Start` vs `OnEnable` prevents subtle initialization bugs
- **Proper component patterns** - `[SerializeField]` over public fields, caching `GetComponent`, using ScriptableObjects for data
- **Performance-aware coding** - Avoiding common Unity performance killers like string concat in Update, unbatched draw calls, allocating physics queries

---

## Install

```bash
npx code-review-unity
```

Or manually copy `.claude/skills/code-review-unity/` to `~/.claude/skills/`

---

## Usage

```
/code-review-unity Assets/Scripts/PlayerController.cs
```

Or review git changes:

```
/code-review-unity
```

---

## What It Checks

| Category | Rules |
|----------|-------|
| **Naming** | PascalCase (classes/methods), camelCase (private fields) |
| **SRP** | One responsibility per MonoBehaviour |
| **DRY** | No duplicate logic |
| **KISS** | Simple over clever |
| **Comments** | Explain why, not what |
| **Unity-specific** | GetComponent caching, Update patterns, ScriptableObject usage, coroutine patterns, lifecycle correctness |

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

### Official Unity Guides
- [C# Style Guide (Unity 6)](https://unity.com/resources/c-sharp-style-guide-unity-6/) - Official style guide for clean, scalable code
- [Unity How-To Library](https://unity.com/how-to) - Tutorials on scripting, optimization, and best practices

### Key Topics from Unity How-To
- **Scripting** - Component patterns, events, ScriptableObjects
- **Optimization** - Profiling, batching, reducing GC allocation
- **Best Practices** - Architecture, testing, Unity UI workflows

---

## Links

- [GitHub](https://github.com/jinda-li/code-review-unity)
- [npm](https://www.npmjs.com/package/code-review-unity)

---

## License

MIT
