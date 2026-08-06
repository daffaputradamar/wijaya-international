import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';
import { termsConditions } from '@/routes';

const sections = [
    {
        title: '1. Informasi yang Kami Kumpulkan',
        en: '1. Information We Collect',
        zh: '1. 我们收集的信息',
        content: `Kami dapat mengumpulkan jenis informasi pribadi berikut:
• Informasi Identifikasi Pribadi: Nama, alamat email, nomor telepon, alamat surat, dan detail kontak lainnya ketika Anda membuat akun atau menghubungi kami.
• Data Penggunaan: Informasi tentang cara Anda menggunakan Layanan kami, seperti alamat IP, jenis browser, informasi perangkat, dan halaman yang dikunjungi.`,
        en_content: `We may collect the following types of personal information:
• Personal Identification Information: Name, email address, phone number, mailing address, and other contact details when you create an account or contact us.
• Usage Data: Information about how you use our Services, such as IP address, browser type, device information, and pages visited.`,
        zh_content: `我们可能会收集以下类型的个人信息：
• 个人身份信息：当您创建账户或联系我们时，包括姓名、邮箱地址、电话号码、邮寄地址及其他联系方式。
• 使用数据：有关您如何使用我们服务的信息，如 IP 地址、浏览器类型、设备信息及访问过的页面。`,
    },
    {
        title: '2. Cara Kami Menggunakan Informasi Anda',
        en: '2. How We Use Your Information',
        zh: '2. 我们如何使用您的信息',
        content: `Kami menggunakan informasi pribadi yang kami kumpulkan untuk tujuan berikut:
• Untuk Memproses Permintaan: Data Anda digunakan untuk memenuhi dan merespons permintaan Anda serta memberikan dukungan pelanggan.
• Untuk Meningkatkan Layanan Kami: Kami menggunakan umpan balik dan data Anda untuk meningkatkan pengalaman pengguna.
• Untuk Komunikasi Pemasaran: Dengan persetujuan Anda, kami dapat mengirimkan email promosi dan pembaruan.`,
        en_content: `We use the personal information we collect for the following purposes:
• To Process Requests: Your data is used to fulfill and respond to your requests and provide customer support.
• To Improve Our Services: We use your feedback and data to enhance user experience.
• For Marketing Communications: With your consent, we may send promotional emails and updates.`,
        zh_content: `我们将所收集的个人信息用于以下目的：
• 处理请求：您的数据用于完成并响应您的请求，并提供客户支持。
• 改进我们的服务：我们利用您的反馈与数据来提升用户体验。
• 营销沟通：在征得您同意后，我们可能发送促销邮件与更新。`,
    },
    {
        title: '3. Berbagi Informasi Anda',
        en: '3. Sharing Your Information',
        zh: '3. 分享您的信息',
        content: `Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat berbagi data Anda dengan:
• Penyedia Layanan: Perusahaan pihak ketiga yang membantu kami mengoperasikan bisnis.
• Otoritas Hukum: Jika diwajibkan oleh hukum, kami dapat berbagi informasi Anda dengan penegak hukum.`,
        en_content: `We do not sell or rent your personal information to third parties. However, we may share your data with:
• Service Providers: Third-party companies that help us operate our business.
• Legal Authorities: If required by law, we may share your information with law enforcement.`,
        zh_content: `我们不会将您的个人信息出售或出租给第三方。但出于以下原因，我们可能共享您的数据：
• 服务提供商：协助我们运营业务的第三方公司。
• 法律机关：如法律要求，我们可能向执法机关提供您的信息。`,
    },
    {
        title: '4. Cookie dan Teknologi Pelacakan',
        en: '4. Cookies and Tracking Technologies',
        zh: '4. Cookie 与跟踪技术',
        content:
            'PT Wijaya International menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman penelusuran Anda. Cookie adalah file kecil yang disimpan di perangkat Anda yang membantu kami meningkatkan kinerja situs. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.',
        en_content:
            'PT Wijaya International uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us improve site performance. You can control the use of cookies through your browser settings.',
        zh_content:
            'PT Wijaya International 使用 Cookie 及类似的跟踪技术来提升您的浏览体验。Cookie 是存储在您设备上的小型文件，帮助我们改进网站性能。您可以通过浏览器设置控制 Cookie 的使用。',
    },
    {
        title: '5. Keamanan Data',
        en: '5. Data Security',
        zh: '5. 数据安全',
        content:
            'Kami menganggap serius keamanan data dan menggunakan langkah-langkah yang tepat untuk melindungi informasi pribadi Anda, termasuk enkripsi dan server yang aman. Meskipun demikian, tidak ada metode transmisi melalui Internet yang 100% aman.',
        en_content:
            'We take data security seriously and use appropriate measures to protect your personal information, including encryption and secure servers. However, no method of transmission over the Internet is 100% secure.',
        zh_content:
            '我们高度重视数据安全，并采取适当措施保护您的个人信息，包括加密与安全服务器。然而，任何通过互联网传输的方法都无法做到 100% 安全。',
    },
    {
        title: '6. Hak Anda',
        en: '6. Your Rights',
        zh: '6. 您的权利',
        content: `Anda memiliki hak-hak berikut terkait informasi pribadi Anda:
• Akses dan Koreksi: Anda dapat meminta akses ke data pribadi yang kami miliki tentang Anda.
• Penghapusan: Anda dapat meminta penghapusan informasi pribadi Anda.
• Opt-Out dari Pemasaran: Anda dapat berhenti berlangganan komunikasi pemasaran kapan saja.`,
        en_content: `You have the following rights concerning your personal information:
• Access and Correction: You can request access to the personal data we hold about you.
• Deletion: You may request the deletion of your personal information.
• Opt-Out of Marketing: You can unsubscribe from marketing communications at any time.`,
        zh_content: `关于您的个人信息，您享有以下权利：
• 访问与更正：您可以请求访问我们持有的关于您的个人数据。
• 删除：您可以请求删除您的个人信息。
• 退出营销：您可以随时退订营销通讯。`,
    },
    {
        title: '10. Hubungi Kami',
        en: '10. Contact Us',
        zh: '10. 联系我们',
        content:
            'Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami di: info@wijayainternational.co.id',
        en_content:
            'If you have any questions or concerns about this Privacy Policy, please contact us at: info@wijayainternational.co.id',
        zh_content:
            '如果您对这些隐私政策有任何疑问或顾虑，请通过以下方式联系我们：info@wijayainternational.co.id',
    },
];

function PrivacyPolicyContent() {
    const { lang } = useLanguage();

    return (
        <>
            <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">Legal</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {lang === 'id' ? 'Kebijakan Privasi' : lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
                    </h1>
                    <p className="text-white/50 text-sm">
                        {lang === 'id'
                            ? 'Di PT Wijaya International, kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda.'
                            : lang === 'zh'
                              ? '在 PT Wijaya International，我们重视您的隐私，并致力于保护您的个人信息。'
                              : 'At PT Wijaya International, we value your privacy and are committed to protecting your personal information.'}
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

                    <div className="pt-8 border-t border-white/10 flex justify-end">
                        <Link
                            href={termsConditions().url}
                            className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                            {lang === 'id' ? 'Syarat & Ketentuan' : lang === 'zh' ? '服务条款' : 'Terms & Conditions'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function PrivacyPolicy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy">
                <meta head-key="description" name="description" content="Kebijakan privasi PT Wijaya International menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda." />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <PrivacyPolicyContent />
        </GuestLayout>
    );
}
