import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, fadeRight, fadeUp, staggerSlow } from './motion-variants';

export default function ContactSection() {
    const { t } = useLanguage();
    const form = useForm({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/contact/submit', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <div id="contact" className="relative h-[200vh] bg-background">
            <div className="sticky top-0 z-0 flex h-screen items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source
                        src="/assets/videos/mixkit-close-up-of-a-handshake-between-two-colleagues-46755-hd-ready.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Dark Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0, 2, 104, 0.7), rgba(155, 25, 25, 0.7), rgba(0, 3, 139, 0.7))',
                    }}
                />

                {/* Content */}
                <motion.section
                    className="relative z-10 mx-auto w-full rounded-2xl px-6 py-8 lg:px-12"
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Left Column: Content */}
                        <motion.div variants={staggerSlow} className="flex flex-col justify-center">
                            {/* Section Label */}
                            <motion.p
                                variants={clipReveal}
                                className="mb-6 text-lg font-semibold tracking-[0.4em] text-red-500 uppercase"
                            >
                                {t('contact.label')}
                            </motion.p>

                            {/* Main Heading */}
                            <motion.h2
                                variants={fadeUp}
                                className="mb-8 text-5xl font-bold tracking-tighter whitespace-pre-line text-white md:text-6xl lg:text-7xl"
                            >
                                {t('contact.title')}
                            </motion.h2>

                            {/* Supporting Text */}
                            <motion.p
                                variants={fadeUp}
                                className="max-w-xl text-lg leading-relaxed text-white/80"
                            >
                                {t('contact.body')}
                            </motion.p>

                            {/* Success Message */}
                            {form.wasSuccessful && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 font-medium text-green-400"
                                >
                                    ✓ {t('contact.success') ?? 'Your inquiry has been submitted!'}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Right Column: Contact Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="flex flex-col justify-center gap-6"
                        >
                            {/* Name Input */}
                            <input
                                type="text"
                                name="name"
                                placeholder={t('contact.form.name')}
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="w-full rounded-full bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.name && (
                                <p className="-mt-4 text-sm text-red-400">{form.errors.name}</p>
                            )}

                            {/* Email Input */}
                            <input
                                type="email"
                                name="email"
                                placeholder={t('contact.form.email')}
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                className="w-full rounded-full bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.email && (
                                <p className="-mt-4 text-sm text-red-400">{form.errors.email}</p>
                            )}

                            {/* Message Textarea */}
                            <textarea
                                name="message"
                                placeholder={t('contact.form.needs')}
                                value={form.data.message}
                                onChange={(e) => form.setData('message', e.target.value)}
                                rows={5}
                                className="w-full resize-none rounded-3xl bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.message && (
                                <p className="-mt-4 text-sm text-red-400">{form.errors.message}</p>
                            )}

                            {/* CTA Button */}
                            <div className="mt-4 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    size="lg"
                                    className="w-full rounded-2xl py-8 text-xl font-light"
                                    disabled={form.processing}
                                >
                                    {form.processing ? '...' : t('contact.cta')}
                                </Button>
                            </div>
                        </motion.form>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
