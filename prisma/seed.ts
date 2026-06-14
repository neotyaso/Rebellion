import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ユーザー作成
  const user = await prisma.user.upsert({
    where: { studentId: '25B3071' },
    update: {},
    create: {
      studentId: '25B3071',
      name: '中村 洸貴',
      grade: 2,
      department: '情報学部情報学科',
      gpa: 3.45,
    },
  })

  // 科目作成
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { code: 'B30B01S2' },
      update: {},
      create: {
        code: 'B30B01S2',
        name: '共通基盤ワークショップ２Ａ',
        teacher: '宮田 佳美',
        credits: 2.0,
        category: '必修',
        dayOfWeek: 0, // 月
        period: 3,
        syllabus: '地域デザインプロジェクトを通じて課題解決能力を養う。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31Q07A2' },
      update: {},
      create: {
        code: 'B31Q07A2',
        name: 'Web入門',
        teacher: '牧 紀子',
        credits: 2.0,
        category: '選択',
        dayOfWeek: 0, // 月
        period: 5,
        syllabus: 'Webの基礎技術であるHTML・CSS・JavaScriptを学ぶ。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31N01A1' },
      update: {},
      create: {
        code: 'B31N01A1',
        name: '確率統計リテラシ１',
        teacher: '鈴木 誠',
        credits: 2.0,
        category: '必修',
        dayOfWeek: 1, // 火
        period: 4,
        syllabus: '確率・統計の基礎を学び、データ分析に活用できる能力を養う。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B30F07A2' },
      update: {},
      create: {
        code: 'B30F07A2',
        name: '政治行動',
        teacher: '渡邊 涼一',
        credits: 2.0,
        category: '選択',
        dayOfWeek: 2, // 水
        period: 1,
        syllabus: '政治行動の理論と実践について学ぶ。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B30H01F2' },
      update: {},
      create: {
        code: 'B30H01F2',
        name: 'スポーツで健康を科学する',
        teacher: '中務 真衣',
        credits: 2.0,
        category: '選択',
        dayOfWeek: 2, // 水
        period: 2,
        syllabus: 'スポーツと健康の関係を科学的に学ぶ。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31Q06A2' },
      update: {},
      create: {
        code: 'B31Q06A2',
        name: 'デザイン思考',
        teacher: '中茂 睦裕',
        credits: 2.0,
        category: '選択',
        dayOfWeek: 2, // 水
        period: 3,
        syllabus: 'デザイン思考のプロセスを学び、課題解決に応用する。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31R03B2' },
      update: {},
      create: {
        code: 'B31R03B2',
        name: '金融情報処理１',
        teacher: '松山 智彦',
        credits: 2.0,
        category: '選択',
        dayOfWeek: 2, // 水
        period: 4,
        syllabus: '金融データの処理・分析手法を学ぶ。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31M03A2' },
      update: {},
      create: {
        code: 'B31M03A2',
        name: '情報学課題解決実習２Ａ',
        teacher: 'シェヘラザード マハブービ',
        credits: 4.0,
        category: '必修',
        dayOfWeek: 3, // 木
        period: 1,
        syllabus: '情報学の課題解決能力を実習形式で養う。',
      },
    }),
    prisma.course.upsert({
      where: { code: 'B31L08D2' },
      update: {},
      create: {
        code: 'B31L08D2',
        name: 'オブジェクト指向プログラミング実習',
        teacher: '本多 博彦',
        credits: 2.0,
        category: '必修',
        dayOfWeek: 4, // 金
        period: 1,
        syllabus: 'オブジェクト指向の概念と実装を学ぶ。',
      },
    }),
  ])

  // 履修登録
  await Promise.all(
    courses.map((course) =>
      prisma.userCourse.upsert({
        where: {
          id: `${user.id}-${course.id}`,
        },
        update: {},
        create: {
          userId: user.id,
          courseId: course.id,
          semester: '前期',
        },
      })
    )
  )

  // 出欠データ
  await Promise.all([
    prisma.attendance.create({
      data: {
        userId: user.id,
        courseId: courses[0].id,
        date: '2026-06-09',
        status: '出席',
      },
    }),
    prisma.attendance.create({
      data: {
        userId: user.id,
        courseId: courses[1].id,
        date: '2026-06-09',
        status: '出席',
      },
    }),
    prisma.attendance.create({
      data: {
        userId: user.id,
        courseId: courses[2].id,
        date: '2026-06-10',
        status: '欠席',
      },
    }),
  ])

  // お知らせ
  await prisma.news.createMany({
    data: [
      {
        title: '前期定期試験について',
        content: '前期定期試験は7月14日〜7月25日に実施されます。',
      },
      {
        title: '夏季休業期間のお知らせ',
        content: '夏季休業期間は8月1日〜9月19日です。',
      },
    ],
  })

  console.log('シードデータの投入が完了しました')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })