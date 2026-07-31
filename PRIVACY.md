# Privacy

RAW → PRO does not include accounts, analytics, a database or server-side prompt
history.

When a user generates a prompt:

1. the browser sends the entered text to this server;
2. the server sends it to the configured OpenAI API project;
3. the generated result is returned to the browser;
4. the application does not intentionally persist the input or output.

Operators remain responsible for infrastructure logs and for the data controls
of their OpenAI API project. Users should not enter secrets or unnecessary
personal data.
