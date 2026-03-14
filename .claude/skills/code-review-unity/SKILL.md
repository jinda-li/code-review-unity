---
name: code-review-unity
description: Reviews Unity C# code against Unity's official style guide. Supports local git diff and GitHub PR review.
argument-hint: [file | diff | PR_URL]
allowed-tools: Read, Grep, Glob, Edit, Bash(git *, gh pr *, gh api *)
---

# Unity Code Review Skill

You are a Unity C# code review expert. Review code based on **Unity's Official C# Style Guide (Unity 6 Edition)** for clean and scalable game code.

## Review Modes

This skill supports two review modes:

### Mode 1: Local Git Diff Review (Default)
When invoked without arguments or with `--diff`, review changes in `git diff`.

### Mode 2: GitHub PR Review
When provided with a PR URL, fetch the PR diff using `gh` commands and review.

---

## Unity C# Style Guide Core Rules

### 1. Naming Conventions

| Type | Rule | Example |
|------|------|---------|
| Classes, Structs | PascalCase | `PlayerController`, `GameStateMachine` |
| Methods, Properties | PascalCase | `MovePlayer`, `Health` |
| Private Fields | camelCase | `health`, `moveSpeed` |
| Local Variables | camelCase | `playerPosition`, `damage` |

**Avoid:**
- Single letter names (except loop counters): `int d` → `int elapsedTimeInDays`
- Hungarian notation: `strName`, `iCount`
- Vague names: `data`, `temp`, `manager`
- Booleans without question format: `dead` → `isDead`, `isPlayerDead`

**Examples from Unity Guide:**

| Avoid | Use Instead | Notes |
|-------|-------------|-------|
| `int d` | `int elapsedTimeInDays` | Be specific about units |
| `int hp`, `string tName` | `int healthPoints`, `string teamName` | Names reveal intent |
| `bool dead` | `bool isDead`, `bool isPlayerDead` | Booleans ask questions - use `is`/`has`/`can` |
| `int getMovementSpeed` | `int movementSpeed` | Use nouns for variables, verbs for methods |

### 2. Single Responsibility Principle (SRP)

**Each MonoBehaviour class should have ONE responsibility**

```csharp
// BAD: One class doing everything
public class Paddle : MonoBehaviour
{
    void HandleInput() { }
    void Move() { }
    void PlayAudio() { }
}

// GOOD: Separate responsibilities
public class PaddleInput : MonoBehaviour { }
public class PaddleMovement : MonoBehaviour { }
public class PaddleAudio : MonoBehaviour { }
```

**Methods should also follow SRP:**
- Each method should do ONE thing
- Avoid boolean parameters: `GetAngle(bool degrees)` → `GetAngleInDegrees()` / `GetAngleInRadians()`
- Keep methods under 25 lines when possible

### 3. KISS Principle (Keep It Simple, Stupid)

- Simple code is better than clever code
- Don't over-engineer
- Avoid "God objects"

### 4. DRY Principle (Don't Repeat Yourself)

```csharp
// BAD: Duplicate logic (WET)
void PlayExplosionA(Vector3 position)
{
    explosionA.Stop();
    explosionA.Play();
    AudioSource.PlayClipAtPoint(soundA, position);
}

void PlayExplosionB(Vector3 position)
{
    explosionB.Stop();
    explosionB.Play();
    AudioSource.PlayClipAtPoint(soundB, position);
}

// GOOD: Extract core functionality (DRY)
void PlayExplosion(ParticleSystem particles, AudioClip sound, Vector3 position)
{
    particles.Stop();
    particles.Play();
    AudioSource.PlayClipAtPoint(sound, position);
}
```

### 5. Comments

**When to Comment:**
- Comments should explain **WHY**, not **WHAT**
- Tricky logic needs clarification
- Public APIs use XML documentation: `/// <summary>`

**When NOT to Comment:**
- Don't use comments to cover up bad code (refactor instead)
- No end-of-line comments
- No commented-out code
- No outdated TODOs

**Comment Style:**
- Use `//` for single-line comments
- Add one space between `//` and comment text
- Place comments on separate lines, not at end of code lines

### 6. YAGNI (You Aren't Gonna Need It)

- Don't add features "just in case"
- Delete unused code, don't comment it out
- Remove TODOs you'll never complete

### 7. Extension Methods

Extension methods are a clean way to extend UnityEngine API:

```csharp
// GOOD: Extension method pattern
public static class TransformExtensions
{
    public static void ResetTransformation(this Transform transform)
    {
        transform.localScale = Vector3.one;
        transform.rotation = Quaternion.identity;
        transform.position = Vector3.zero;
    }
}
```

### 8. UI Toolkit Naming (BEM Convention)

For UI Toolkit and USS/uxml files, use BEM naming:

```
block-name__element-name--modifier-name
```

**Examples:**
- `navbar-menu__shop-button--small`
- `menu__home-button`
- `button--pressed`

**Tips:**
- Keep names short and clear
- Avoid type names in selectors (Button, Label)
- Use semantic naming, not presentational
- Use `AddToClassList()` in constructors to add USS classes

---

## Unity-Specific Review Focus

### MonoBehaviour Lifecycle

- Correct usage of `Awake` vs `Start` vs `OnEnable`
- Cleanup in `OnDestroy` (event unsubscription, nullifying references)
- `[RuntimeInitializeOnLoadMethod]` usage scenarios

### Coroutine Patterns

- Store Coroutine references for cancellation
- Avoid `StopAllCoroutines()` - use specific `StopCoroutine()`
- Consider UniTask for complex chains

### ScriptableObject Architecture

- Use ScriptableObject for data containers
- Proper use of `[CreateAssetMenu]`
- SO events for decoupled communication

### Unity API Misuse Detection

| Issue | Correct Approach |
|-------|------------------|
| GetComponent every frame | `[SerializeField]` or lazy caching |
| String Tag comparison | `LayerMask.NameToLayer()` |
| Allocating physics queries | Use `NonAlloc` variants |
| Frequent Instantiate/Destroy | Use object pooling |

### Performance Concerns

**GC Allocation (avoid in Update):**
- String concatenation
- LINQ queries
- Methods returning new objects

**Update Method Bloat:**
- Keep Update methods minimal
- Consider event-driven patterns
- Use coroutines for time-based logic

**Draw Calls:**
- Batch static geometry
- Use GPU instancing

### Testing (Unity Test Framework)

- Tests in separate Assembly
- `[UnityTest]` for coroutine tests
- `[Test]` for pure C# tests
- Mock external dependencies

---

## Review Workflow

### Local Diff Review

1. Run `git diff` or `git diff --staged` to get changes
2. Read full changed files for context
3. Review against Unity style guide
4. Output review results

### GitHub PR Review

1. Use `gh pr view $URL` to get PR info
2. Use `gh pr diff $URL` to get diff
3. Check PR status (merged, draft)
4. Read related files for context
5. Review against Unity style guide
6. Output review results (optionally post with `gh pr comment`)

---

## Review Output Format

```markdown
## Code Review: [filename]

### Critical Issues

1. **Issue Title** (file:lines)
   - Issue description
   - Why it matters (cite Unity style guide)
   - Suggested fix with code example

### Style Violations

...

### Suggestions

...
```

### Example

```markdown
## Code Review: PlayerController.cs

### Critical Issues

1. **SRP Violation - God Class** (PlayerController.cs:15-89)
   - PlayerController handles input, movement, audio, and inventory
   - Unity Style Guide: "Each MonoBehaviour should have one responsibility"
   - Split into: PlayerInput, PlayerMovement, PlayerAudio, PlayerInventory

2. **Duplicate Logic** (PlayerController.cs:45-60, 120-135)
   - Same damage calculation logic appears twice
   - Extract to `CalculateDamage(float baseDamage, float multiplier)` method

### Style Violations

3. **Poor Variable Naming** (PlayerController.cs:23)
   - `int d` should be `int elapsedTimeInDays` - be specific about units
   - `bool dead` should be `bool isDead` - booleans ask questions

4. **Method with Boolean Flag** (PlayerController.cs:78)
   - `GetTargetPosition(bool worldSpace)` should be two methods:
     - `GetTargetPositionInWorldSpace()`
     - `GetTargetPositionInLocalSpace()`

### Suggestions

5. **Consider Extension Method** (PlayerController.cs:92)
   - `ResetTransform()` could be an extension method for Transform

6. **Add XML Documentation** (public API)
   - Public methods lack `/// <summary>` documentation
```

---

## Arguments

- **File path**: Review the specified file
- **`--diff` or no argument**: Review changes in `git diff`
- **PR URL**: Review a GitHub PR

```bash
# Example usage
claude code-review-unity                          # Review git diff
claude code-review-unity --diff                   # Review git diff
claude code-review-unity Assets/Scripts/Player.cs # Review specific file
claude code-review-unity https://github.com/...   # Review GitHub PR
```

---

## Common Code Smells

| Code Smell | Description | Fix |
|------------|-------------|-----|
| Enigmatic naming | Mysterious or unclear names | Use straightforward, descriptive names |
| Needless complexity | Over-engineering, God objects | Break into smaller dedicated parts |
| Inflexibility | Small change requires many changes | Check SRP violations |
| Fragility | Minor change breaks everything | Review dependencies |
| Immobility | Code not reusable elsewhere | Decouple logic |
| Duplicate code | Copy-pasted logic | Extract core functionality |
| Excessive commentary | Comments for every line | Use better names, trust the code |
