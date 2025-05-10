import prisma from '@/lib/prisma';

export async function get_apps_list(userId: string) {
  return await prisma.openApiApp.findMany({
    where: { userId: userId },
    // select: {
    //   id: true,
    //   name: true,
    //   appId: true,
    //   createdAt: true,
    // },
  });
}
