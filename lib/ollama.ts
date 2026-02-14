import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export async function convertWithOllama(javaCode: string, model: string = 'codellama') {
    const prompt = `
You are an expert QA Automation Engineer. Your task is to convert the following Selenium Java code into Playwright TypeScript code.

RULES:
1. OUTPUT ONLY THE CODE. No markdown, no explanations.
2. Use Page Object Model if the input suggests it, otherwise use a simple test structure.
3. Use 'await' for all async actions.
4. Replace 'By.id' with 'page.locator("#id")'.
5. Replace 'By.xpath' with 'page.locator("xpath=...")'.
6. Replace 'sendKeys' with 'fill'.
7. Replace 'click' with 'click'.
8. Use 'expect' from '@playwright/test' for assertions.

INPUT CODE:
${javaCode}

OUTPUT CODE:
`;

    try {
        const response = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            stream: false,
        });
        return response.message.content;
    } catch (error) {
        console.error('Ollama conversion failed:', error);
        throw new Error('Failed to convert with Ollama. Ensure Ollama is running.');
    }
}
