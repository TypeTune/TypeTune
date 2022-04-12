import { client, checkError } from './client';

export async function saveText(title, text_content) {
  const response = await client
    .from('user_input')
    .insert([{ title, text_content }]);
  return checkError(response);
}