import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppFloatingButtonProps {
    phoneNumber?: string;
    message?: string;
}

export default function WhatsAppFloatingButton({ 
    phoneNumber = "+22572114444", 
    message = "Bonjour KeyPro, j'aimerais avoir plus d'informations sur vos services." 
}: WhatsAppFloatingButtonProps) {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:bg-[#128C7E] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
            aria-label="Discuter sur WhatsApp"
        >
            <div className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex size-5 rounded-full bg-[#25D366] border-2 border-white"></span>
            </div>
            <MessageCircle className="size-8" />
        </motion.a>
    );
}
