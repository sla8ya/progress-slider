import { Plugin } from "obsidian";

export default class ProgressSliderPlugin extends Plugin {
  async onload() {
    console.log("Loading Progress Slider Plugin");

    // Регистрация команды для вставки блока text-progress-slider
    this.addCommand({
      id: "insert-progress-slider",
      name: "Insert Progress Slider",
      editorCallback: (editor) => {
        const template = `
\`\`\`text-progress-slider
label: 
min: 0
max: 10
current: 5
showValue: true
unit: 
\`\`\`
`;
        editor.replaceSelection(template.trim() + "\n");
      },
    });

    // Регистрация обработчика для блока text-progress-slider
    this.registerMarkdownCodeBlockProcessor(
      "text-progress-slider",
      this.processSliderBlock.bind(this)
    );
  }

  onunload() {
    console.log("Unloading Progress Slider Plugin");
  }

  private processSliderBlock(source: string, el: HTMLElement, ctx: any) {
    const config = this.parseSliderConfig(source);

    // Создание контейнера для слайдера
    const container = el.createDiv({ cls: "progress-slider-container" });

    // Текстовый ярлык (если указан)
    if (config.label) {
      container.createEl("span", {
        cls: "progress-slider-label",
        text: config.label,
      });
    }

    // Кнопка уменьшения значения
    const decrementButton = container.createEl("button", {
      cls: "progress-slider-button decrement",
      text: "-",
    });

    // Слайдер
    const slider = container.createEl("input", {
      type: "range",
      cls: "progress-slider",
      value: config.current.toString(),
      attr: {
        min: config.min.toString(),
        max: config.max.toString(),
      },
    });

    // Кнопка увеличения значения
    const incrementButton = container.createEl("button", {
      cls: "progress-slider-button increment",
      text: "+",
    });

    // Элемент для отображения текущего значения с единицей измерения
    const valueLabel = container.createEl("span", {
      cls: "progress-slider-value",
      text: config.showValue
        ? `${config.current.toString()}${config.unit || ""}`
        : "",
    });

    // Функция для обновления фона слайдера
    const updateSliderBackground = () => {
      const percentage =
        ((parseInt(slider.value, 10) - config.min) /
          (config.max - config.min)) *
        100;
      slider.style.background = `linear-gradient(to right, var(--interactive-accent) 0%, var(--interactive-accent) ${percentage}%, var(--background-modifier-border) ${percentage}%, var(--background-modifier-border) 100%)`;
    };

    // Функция для обновления значения
    const updateValue = async (newValue: number) => {
      slider.value = newValue.toString();
      valueLabel.textContent = config.showValue
        ? `${newValue.toString()}${config.unit || ""}`
        : "";
      updateSliderBackground();

      // Сохранение текущего значения в Markdown
      const currentFile = this.app.workspace.getActiveFile();
      if (!currentFile) return;

      const fileContent = await this.app.vault.read(currentFile);

      // Обновляем содержимое Markdown файла
      const updatedContent = this.updateSliderValueInMarkdown(
        fileContent,
        source,
        newValue.toString()
      );
      await this.app.vault.modify(currentFile, updatedContent);
    };

    // Обработчик изменения значения слайдера
    slider.addEventListener("input", () => {
      const newValue = parseInt(slider.value, 10);
      updateValue(newValue);
    });

    // Обработчик для кнопки "-"
    decrementButton.addEventListener("click", () => {
      const newValue = Math.max(config.min, parseInt(slider.value, 10) - 1);
      updateValue(newValue);
    });

    // Обработчик для кнопки "+"
    incrementButton.addEventListener("click", () => {
      const newValue = Math.min(config.max, parseInt(slider.value, 10) + 1);
      updateValue(newValue);
    });

    // Инициализация фона
    updateSliderBackground();
  }

  // Парсинг пользовательского синтаксиса
  private parseSliderConfig(source: string) {
    const config: {
      label: string;
      min: number;
      max: number;
      current: number;
      showValue: boolean;
      unit: string;
    } = { label: "", min: 0, max: 100, current: 50, showValue: true, unit: "" };

    source.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key === "label") config.label = value || "";
      if (key === "min") config.min = parseInt(value, 10) || 0;
      if (key === "max") config.max = parseInt(value, 10) || 100;
      if (key === "current") config.current = parseInt(value, 10) || 50;
      if (key === "showValue") config.showValue = value === "true";
      if (key === "unit") config.unit = value || "";
    });

    return config;
  }

  // Обновление значения в Markdown-коде
  private updateSliderValueInMarkdown(
    content: string,
    blockSource: string,
    newValue: string
  ): string {
    const blockStart = content.indexOf(blockSource);
    if (blockStart === -1) return content;

    const blockEnd = blockStart + blockSource.length;
    const blockLines = content.substring(blockStart, blockEnd).split("\n");

    // Обновляем строку current
    const updatedBlockLines = blockLines.map((line) =>
      line.startsWith("current:") ? `current: ${newValue}` : line
    );

    // Собираем обновлённое содержимое файла
    return (
      content.substring(0, blockStart) +
      updatedBlockLines.join("\n") +
      content.substring(blockEnd)
    );
  }
}
