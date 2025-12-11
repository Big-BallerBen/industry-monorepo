export const generateResponse = async (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`**AI Analysis for:** "${input}"\n\nThis is a simulated response from the AI Ops Architect. In a real environment, this would call the Gemini API to process your staffing request, analyze roster compatibility, or draft communications.\n\n*Action Suggested:* Review the dashboard for updates.`);
    }, 1500);
  });
};