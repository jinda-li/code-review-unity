# code-review-unity

> Claude Code skill for reviewing Unity C# code against [Unity's Official C# Style Guide (Unity 6 Edition)](https://unity.com/resources/c-sharp-style-guide-unity-6/).

[![npm version](https://badge.fury.io/js/code-review-unity.svg)](https://www.npmjs.com/package/code-review-unity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npx code-review-unity
```

Or manually copy `.claude/skills/code-review-unity/` to `~/.claude/skills/`

## Usage

```
/code-review-unity Assets/Scripts/PlayerController.cs
```

Or review git changes:

```
/code-review-unity
```

## What It Checks

| Category | Rules |
|----------|-------|
| **Naming** | PascalCase (classes/methods), camelCase (private fields) |
| **SRP** | One responsibility per MonoBehaviour |
| **DRY** | No duplicate logic |
| **KISS** | Simple over clever |
| **Comments** | Explain why, not what |
| **Unity-specific** | GetComponent caching, Update patterns, ScriptableObject usage |

## Example Output

```markdown
## Code Review: PlayerController.cs

### Critical Issues

1. **SRP Violation - God Class** (lines 15-89)
   - Handles input, movement, audio, and inventory
   - Split into: PlayerInput, PlayerMovement, PlayerAudio, PlayerInventory

### Style Violations

2. **Poor Variable Naming** (line 23)
   - `int d` should be `int elapsedTimeInDays` - be specific about units
```

## Resources

- [Unity C# Style Guide (Unity 6)](https://unity.com/resources/c-sharp-style-guide-unity-6/)
- [Unity Scripting Best Practices](https://docs.unity3d.com/Manual/BestPracticeUnderstandingPerformanceInUnity4-1.html)

## Links

- [GitHub](https://github.com/jinda-li/code-review-unity)
- [npm](https://www.npmjs.com/package/code-review-unity)

## License

MIT
