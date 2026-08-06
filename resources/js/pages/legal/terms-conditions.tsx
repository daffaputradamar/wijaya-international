import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';
import { privacyPolicy } from '@/routes';

const sections = [
    {
        title: '1. Pendahuluan',
        en: '1. Introduction',
        zh: '1. 引言',
        content:
            'Syarat dan Ketentuan ini ("Syarat") mengatur akses dan penggunaan Anda atas situs web, aplikasi, dan layanan lainnya yang disediakan oleh PT Wijaya International ("kami" atau "perusahaan"). Dengan menggunakan Layanan kami, Anda setuju untuk mematuhi Syarat ini.',
        en_content:
            'These Terms and Conditions ("Terms") govern your access and use of the website and services provided by PT Wijaya International ("we" or "company"). By using our Services, you agree to comply with these Terms.',
        zh_content:
            '这些条款与条件（"条款"）约束您对 PT Wijaya International（"我们"或"公司"）提供的网站与服务的使用。使用我们的服务即表示您同意遵守这些条款。',
    },
    {
        title: '2. Kelayakan',
        en: '2. Eligibility',
        zh: '2. 资格',
        content:
            'Dengan menggunakan Layanan kami, Anda mengonfirmasi bahwa Anda setidaknya berusia 16 tahun atau telah mencapai usia mayoritas hukum di yurisdiksi Anda. Jika Anda menggunakan Layanan atas nama bisnis atau organisasi, Anda menyatakan dan menjamin bahwa Anda memiliki wewenang untuk mengikat entitas tersebut pada Syarat ini.',
        en_content:
            'By using our Services, you confirm that you are at least 16 years old or have reached the legal age of majority in your jurisdiction. If you are using the Services on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.',
        zh_content:
            '使用我们的服务，即表示您确认自己年满16周岁，或已达到您所在司法管辖区的法定成年年龄。如果您代表企业或组织使用服务，您声明并保证您有权使该实体受这些条款约束。',
    },
    {
        title: '3. Penggunaan Layanan',
        en: '3. Use of Services',
        zh: '3. 服务使用',
        content: `Anda setuju untuk menggunakan Layanan kami hanya untuk tujuan yang sah dan sesuai dengan semua hukum dan peraturan yang berlaku. Anda dilarang:
• Menggunakan Layanan untuk terlibat dalam aktivitas penipuan atau melanggar hukum.
• Mengganggu atau mengganggu fungsionalitas Layanan kami.
• Mencoba mendapatkan akses tidak sah ke sistem, data, atau informasi pengguna lain.
• Menyamar sebagai orang atau entitas apa pun atau memberikan informasi palsu.`,
        en_content: `You agree to use our Services for lawful purposes only and in compliance with all applicable laws and regulations. You are prohibited from:
• Using the Services to engage in any fraudulent or unlawful activity.
• Interfering with or disrupting the functionality of our Services.
• Attempting to gain unauthorized access to our systems, data, or other users' information.
• Impersonating any person or entity or providing false information.`,
        zh_content: `您同意仅出于合法目的使用我们的服务，并遵守所有适用的法律法规。您不得：
• 使用服务从事任何欺诈或非法活动。
• 干扰或破坏我们服务的功能。
• 尝试未经授权访问我们的系统、数据或其他用户的信息。
• 冒充任何个人或实体，或提供虚假信息。`,
    },
    {
        title: '4. Kekayaan Intelektual',
        en: '4. Intellectual Property',
        zh: '4. 知识产权',
        content:
            'Semua konten di situs web dan aplikasi PT Wijaya International, termasuk teks, gambar, logo, grafik, dan desain, adalah milik PT Wijaya International atau pemberi lisensinya dan dilindungi oleh hukum hak cipta, merek dagang, dan kekayaan intelektual lainnya.',
        en_content:
            'All content on the PT Wijaya International website and app, including text, images, logos, graphics, and designs, is the property of PT Wijaya International or its licensors and is protected by copyright, trademark, and other intellectual property laws.',
        zh_content:
            'PT Wijaya International 网站与应用程序上的所有内容，包括文本、图像、标志、图形与设计，均归 PT Wijaya International 或其许可方所有，并受版权、商标及其他知识产权法律保护。',
    },
    {
        title: '5. Batasan Tanggung Jawab',
        en: '5. Limitation of Liability',
        zh: '5. 责任限制',
        content:
            'Sejauh yang diizinkan oleh hukum, PT Wijaya International dan afiliasinya tidak akan bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan Layanan kami.',
        en_content:
            'To the fullest extent permitted by law, PT Wijaya International and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Services.',
        zh_content:
            '在法律允许的最大范围内，PT Wijaya International 及其关联公司不对因您使用我们的服务而产生的任何间接、附带、特殊或后果性损害承担责任。',
    },
    {
        title: '6. Hukum yang Berlaku',
        en: '6. Governing Law',
        zh: '6. 适用法律',
        content:
            'Syarat ini dan setiap sengketa yang timbul dari atau terkait dengan penggunaan Layanan akan diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.',
        en_content:
            'These Terms and any disputes arising out of or related to your use of the Services will be governed by and construed in accordance with the laws of the Republic of Indonesia.',
        zh_content:
            '这些条款以及因您使用服务而产生的或与之相关的任何争议，均受印度尼西亚共和国法律管辖并依其解释。',
    },
    {
        title: '7. Penghentian',
        en: '7. Termination',
        zh: '7. 终止',
        content:
            'Kami berhak untuk menghentikan atau menangguhkan akses Anda ke Layanan atas kebijakan kami, tanpa pemberitahuan, untuk perilaku apa pun yang menurut kami melanggar Syarat ini atau merugikan pengguna kami, kami, atau pihak ketiga.',
        en_content:
            'We reserve the right to terminate or suspend your access to the Services at our discretion, without notice, for any conduct that we believe violates these Terms or is harmful to our users, us, or third parties.',
        zh_content:
            '对于任何我们认为违反这些条款或损害我们的用户、我们或第三方利益的行为，我们保留自行决定、恕不另行通知地终止或暂停您访问服务的权利。',
    },
    {
        title: '8. Hubungi Kami',
        en: '8. Contact Us',
        zh: '8. 联系我们',
        content:
            'Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di: info@wijayainternational.co.id | Jakarta, Indonesia',
        en_content:
            'If you have any questions about these Terms & Conditions, please contact us at: info@wijayainternational.co.id | Jakarta, Indonesia',
        zh_content:
            '如果您对这些条款与条件有任何疑问，请通过以下方式联系我们：info@wijayainternational.co.id | 印度尼西亚，雅加达',
    },
];

function TermsContent() {
    const { lang } = useLanguage();

    return (
        <>
            <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">Legal</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {lang === 'id' ? 'Syarat & Ketentuan' : lang === 'zh' ? '服务条款' : 'Terms & Conditions'}
                    </h1>
                    <p className="text-white/50 text-sm">
                        {lang === 'id'
                            ? 'Syarat dan Ketentuan penggunaan layanan PT Wijaya International.'
                            : lang === 'zh'
                              ? '使用 PT Wijaya International 服务的条款与条件。'
                              : 'Terms and conditions for using PT Wijaya International services.'}
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 lg:px-12 bg-[#0a0a0a]">
                <div className="max-w-3xl mx-auto flex flex-col gap-12">
                    {sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-white">
                                {lang === 'id' ? section.title : lang === 'zh' ? section.zh : section.en}
                            </h2>
                            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                                {lang === 'id' ? section.content : lang === 'zh' ? section.zh_content : section.en_content}
                            </p>
                        </div>
                    ))}

                    <div className="pt-8 border-t border-white/10 flex justify-start">
                        <Link
                            href={privacyPolicy().url}
                            className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            {lang === 'id' ? 'Kebijakan Privasi' : lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function TermsConditions() {
    return (
        <GuestLayout>
            <Head title="Terms & Conditions">
                <meta head-key="description" name="description" content="Syarat dan ketentuan penggunaan layanan PT Wijaya International. Harap baca dengan seksama sebelum menggunakan layanan kami." />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <TermsContent />
        </GuestLayout>
    );
}
