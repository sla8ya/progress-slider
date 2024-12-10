# Progress Slider Plugin for Obsidian

**Progress Slider Plugin** — это плагин для [Obsidian](https://obsidian.md), позволяющий добавлять интерактивные слайдеры в ваши Markdown-заметки. Плагин поддерживает настраиваемые параметры, такие как минимальное и максимальное значение, текущий прогресс, текстовые метки, единицы измерения и многое другое.

---

## 📥 Установка

### Через GitHub
1. Скачайте последние версии файлов [`main.js`](./main.js), [`manifest.json`](./manifest.json), и [`styles.css`](./styles.css) из раздела [Releases](https://github.com/sla8ya/progress-slider/releases).
2. Поместите файлы в папку `.obsidian/plugins/progress-slider` в вашем хранилище Obsidian.
3. Перейдите в настройки Obsidian → **Community Plugins** → включите **Progress Slider Plugin**.

### Через Obsidian Community Plugins (планируется)
Мы работаем над добавлением плагина в официальный репозиторий плагинов Obsidian.

---

## 🛠️ Использование

1. В вашей Markdown-заметке создайте блок с синтаксисом `text-progress-slider`:

   ```markdown
   ```text-progress-slider
   label: Volume
   min: 0
   max: 100
   current: 50
   showValue: true
   unit: %
   ```
   ```

2. Сохраните заметку. Плагин автоматически преобразует этот блок в интерактивный слайдер.

---

## 📝 Параметры

В блоке `text-progress-slider` вы можете использовать следующие параметры:

| Параметр    | Описание                                                                                                                                              | Пример значения | По умолчанию |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|--------------|
| `label`     | Текст, отображаемый слева от слайдера.                                                                                                                | `"Volume"`      | `""`         |
| `min`       | Минимальное значение слайдера.                                                                                                                        | `0`             | `0`          |
| `max`       | Максимальное значение слайдера.                                                                                                                        | `100`           | `100`        |
| `current`   | Текущее значение слайдера.                                                                                                                            | `50`            | `50`         |
| `showValue` | Показывать ли текущее значение.                                                                                                                       | `true`          | `true`       |
| `unit`      | Единица измерения, отображаемая рядом с текущим значением (например, `%`, `$`, или любой текст).                                                       | `"%"`           | `""`         |

---

## 🌟 Примеры

### Пример 1: Процент выполнения

```markdown
```text-progress-slider
label: Completion
min: 0
max: 100
current: 75
showValue: true
unit: %
```
```

**Результат**: Слайдер с меткой "Completion", показывающий прогресс в процентах.

### Пример 2: Регулятор громкости

```markdown
```text-progress-slider
label: Volume
min: 0
max: 10
current: 5
showValue: true
unit: /10
```

```

**Результат**: Слайдер для настройки громкости с меткой "Volume".

---

## 🤝 Вклад

Мы приветствуем ваш вклад! Если вы хотите улучшить этот плагин:
1. Создайте форк репозитория.
2. Внесите изменения.
3. Отправьте pull request.

---

## ⚠️ Лицензия

Этот плагин распространяется под лицензией [MIT](./LICENSE). Вы можете свободно использовать, модифицировать и распространять его.

---

## 🛠️ Разработчик

Разработчик: **[sla8ya](https://github.com/sla8ya)**  
Для вопросов и предложений: создайте [Issue](https://github.com/sla8ya/progress-slider/issues).

---

### ✨ Наслаждайтесь использованием Progress Slider Plugin! ✨

---
