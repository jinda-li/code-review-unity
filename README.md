# code-review-unity

> Claude Code skill for reviewing Unity C# code against [Unity's Official C# Style Guide (Unity 6 Edition)](https://unity.com/resources/c-sharp-style-guide-unity-6/).

[![npm version](https://badge.fury.io/js/code-review-unity.svg)](https://www.npmjs.com/package/code-review-unity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why Follow Unity's Style Guide?

Following Unity's official C# style guide improves **performance** (avoids GC allocation, Update bloat), **team collaboration** (consistent patterns, readable code), and **maintainability** (small classes, less duplication). It also prevents Unity-specific pitfalls like lifecycle misuse, improper coroutine patterns, and API anti-patterns.

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

## Workflow

1. **Input** - Provide a file, git diff, or PR URL
2. **Parse** - Read the code and identify changes
3. **Review** - Check against Unity's C# Style Guide (Unity 6 Edition)
4. **Report** - Output issues organized by severity (Critical, Style, Suggestions)

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

---

## Links

- [GitHub](https://github.com/jinda-li/code-review-unity)
- [npm](https://www.npmjs.com/package/code-review-unity)

---

## License

MIT
