import { run } from '@/server/server';

try {
  run();
} catch (error) {
  console.log(error);
}
