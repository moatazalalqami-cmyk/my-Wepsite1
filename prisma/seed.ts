import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mutaz.com' },
    update: {},
    create: {
      name: 'معتز العلقمي',
      email: 'admin@mutaz.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  const categories = [
    { name: 'ثقافية', slug: 'cultural', description: 'مقالات في الأدب الكلاسيكي والثقافة' },
    { name: 'إسلامية', slug: 'islamic', description: 'تأملات في الفكر الإسلامي' },
    { name: 'علمية', slug: 'scientific', description: 'تطورات التقنية والذكاء الاصطناعي' },
    { name: 'فكرية', slug: 'intellectual', description: 'مقالات فكرية ومبادرات مجتمعية' },
  ]
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  const tags = ['تصميم', 'ذكاء اصطناعي', 'الرافعي', 'مبادرات', 'Kling AI'].map(name => ({
    name,
    slug: name.replace(/\s+/g, '-').toLowerCase()
  }))
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
  }
  const posts = [
    {
      title: 'دمج أدوات الذكاء الاصطناعي في إنتاج الهويات البصرية',
      slug: 'ai-in-visual-identity',
      excerpt: 'كيف تساهم أدوات مثل Veo و Kling AI في تسريع عمليات إنتاج الفيديوهات.',
      content: '<p>في عالم التصميم الجرافيكي اليوم، لم يعد الذكاء الاصطناعي مجرد أداة ثانوية...</p>',
      featuredImage: '/images/hero-mockup.jpg',
      status: 'PUBLISHED',
      authorId: admin.id,
      categoryId: (await prisma.category.findUnique({ where: { slug: 'scientific' } }))?.id,
    }
  ]
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post as any,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        tags: { connect: [{ slug: tags[0].slug }] }
      },
    })
  }
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
