import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';
import { privacyPolicy } from '@/routes';

const sections = [
    {
        title: '1. Pendahuluan',
        en: '1. Introduction',
        content:
            'Syarat dan Ketentuan ini ("Syarat") mengatur akses dan penggunaan Anda atas situs web, aplikasi, dan layanan lainnya yang disediakan oleh PT Wijaya International ("kami" atau "perusahaan"). Dengan menggunakan Layanan kami, Anda setuju untuk mematuhi Syarat ini.',
        en_content:
            'These Terms and Conditions ("Terms") govern your access and use of the website and services provided by PT Wijaya International ("we" or "company"). By using our Services, you agree to comply with these Terms.',
    },
    {
        title: '2. Kelayakan',
        en: '2. Eligibility',
        content:
            'Dengan menggunakan Layanan kami, Anda mengonfirmasi bahwa Anda setidaknya berusia 16 tahun atau telah mencapai usia mayoritas hukum di yurisdiksi Anda. Jika Anda menggunakan Layanan atas nama bisnis atau organisasi, Anda menyatakan dan menjamin bahwa Anda memiliki wewenang untuk mengikat entitas tersebut pada Syarat ini.',
        en_content:
            'By using our Services, you confirm that you are at least 16 years old or have reached the legal age of majority in your jurisdiction. If you are using the Services on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.',
    },
    {
        title: '3. Penggunaan Layanan',
        en: '3. Use of Services',
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
    },
    {
        title: '4. Kekayaan Intelektual',
        en: '4. Intellectual Property',
        content:
            'Semua konten di situs web dan aplikasi PT Wijaya International, termasuk teks, gambar, logo, grafik, dan desain, adalah milik PT Wijaya International atau pemberi lisensinya dan dilindungi oleh hukum hak cipta, merek dagang, dan kekayaan intelektual lainnya.',
        en_content:
            'All content on the PT Wijaya International website and app, including text, images, logos, graphics, and designs, is the property of PT Wijaya International or its licensors and is protected by copyright, trademark, and other intellectual property laws.',
    },
    {
        title: '5. Batasan Tanggung Jawab',
        en: '5. Limitation of Liability',
        content:
            'Sejauh yang diizinkan oleh hukum, PT Wijaya International dan afiliasinya tidak akan bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan Layanan kami.',
        en_content:
            'To the fullest extent permitted by law, PT Wijaya International and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Services.',
    },
    {
        title: '6. Hukum yang Berlaku',
        en: '6. Governing Law',
        content:
            'Syarat ini dan setiap sengketa yang timbul dari atau terkait dengan penggunaan Layanan akan diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.',
        en_content:
            'These Terms and any disputes arising out of or related to your use of the Services will be governed by and construed in accordance with the laws of the Republic of Indonesia.',
    },
    {
        title: '7. Penghentian',
        en: '7. Termination',
        content:
            'Kami berhak untuk menghentikan atau menangguhkan akses Anda ke Layanan atas kebijakan kami, tanpa pemberitahuan, untuk perilaku apa pun yang menurut kami melanggar Syarat ini atau merugikan pengguna kami, kami, atau pihak ketiga.',
        en_content:
            'We reserve the right to terminate or suspend your access to the Services at our discretion, without notice, for any conduct that we believe violates these Terms or is harmful to our users, us, or third parties.',
    },
    {
        title: '8. Hubungi Kami',
        en: '8. Contact Us',
        content:
            'Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di: info@wijayainternational.co.id | Jakarta, Indonesia',
        en_content:
            'If you have any questions about these Terms & Conditions, please contact us at: info@wijayainternational.co.id | Jakarta, Indonesia',
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
                        {lang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
                    </h1>
                    <p className="text-white/50 text-sm">
                        {lang === 'id'
                            ? 'Syarat dan Ketentuan penggunaan layanan PT Wijaya International.'
                            : 'Terms and conditions for using PT Wijaya International services.'}
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 lg:px-12 bg-[#0a0a0a]">
                <div className="max-w-3xl mx-auto flex flex-col gap-12">
                    {sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-white">
                                {lang === 'id' ? section.title : section.en}
                            </h2>
                            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                                {lang === 'id' ? section.content : section.en_content}
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
                            {lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
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
