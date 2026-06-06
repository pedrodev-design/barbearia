const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf-8');

// 1. Add Navigation Links
index = index.replace(
    '<a href="#depoimentos" class="text-obsidian-300 hover:text-gold-300 transition-colors duration-300">Relatos</a>',
    '<a href="#depoimentos" class="text-obsidian-300 hover:text-gold-300 transition-colors duration-300">Relatos</a>\n                <a href="#galeria" class="text-obsidian-300 hover:text-gold-300 transition-colors duration-300">Galeria</a>\n                <a href="#contato" class="text-obsidian-300 hover:text-gold-300 transition-colors duration-300">Contato</a>'
);

index = index.replace(
    '<a href="#depoimentos" @click="mobileMenuOpen = false" class="block py-2 text-obsidian-200 hover:text-gold-300">Relatos</a>',
    '<a href="#depoimentos" @click="mobileMenuOpen = false" class="block py-2 text-obsidian-200 hover:text-gold-300">Relatos</a>\n            <a href="#galeria" @click="mobileMenuOpen = false" class="block py-2 text-obsidian-200 hover:text-gold-300">Galeria</a>\n            <a href="#contato" @click="mobileMenuOpen = false" class="block py-2 text-obsidian-200 hover:text-gold-300">Contato</a>'
);

// 2. Add WhatsApp Button
index = index.replace(
    '<!-- Carrinho Flutuante',
    `<!-- WhatsApp Flutuante -->
        <a href="https://wa.me/5562981816251" target="_blank" class="fixed bottom-6 left-6 z-40 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-transform duration-300">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
        
        <!-- Carrinho Flutuante`
);

// 3. Update Equipe Section
const giovannaBlock = `
                    <!-- Bloco Giovanna -->
                    <div class="bg-obsidian-900 border border-obsidian-800 p-8 sm:p-12 rounded-sm relative group hover:border-gold-500/20 transition-all duration-500 hover:-translate-y-1">
                        <div class="absolute top-0 right-0 p-6 font-serif text-6xl text-gold-500/10 font-bold select-none group-hover:text-gold-500/15 transition-colors">03</div>
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="w-12 h-12 rounded-full border border-gold-400 flex items-center justify-center text-gold-400">
                                <i class="fa-solid fa-clipboard-check text-lg"></i>
                            </div>
                            <div>
                                <h3 class="font-serif text-2xl text-white font-semibold">Giovanna</h3>
                                <p class="text-[10px] uppercase tracking-widest text-gold-400 font-sans">Administração, Reparo e Esterilização</p>
                            </div>
                        </div>
                        <p class="text-obsidian-300 font-light leading-relaxed mb-6">
                            Giovanna garante a excelência nos bastidores do atelier. Especialista na manutenção técnica dos equipamentos de ponta, também supervisiona rigorosamente a esterilização de grau médico, oferecendo o mais alto padrão de higiene e gestão do ambiente.
                        </p>
                        <div class="space-y-3 pt-4 border-t border-obsidian-850">
                            <div class="flex items-center space-x-2 text-xs text-obsidian-300">
                                <span class="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                <span>Gestão Administrativa</span>
                            </div>
                            <div class="flex items-center space-x-2 text-xs text-obsidian-300">
                                <span class="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                <span>Reparo de Equipamentos</span>
                            </div>
                            <div class="flex items-center space-x-2 text-xs text-obsidian-300">
                                <span class="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                <span>Esterilização de Instrumentais</span>
                            </div>
                        </div>
                    </div>
`;

index = index.replace(
    'class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"',
    'class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"'
);

index = index.replace(
    /<!-- Bloco Márcio -->([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    `<!-- Bloco Márcio -->$1</div>${giovannaBlock}                </div>\n            </div>\n        </section>`
);
index = index.replace('Os Especialistas', 'Nossa Equipe');


// 4. Depoimentos Section (Dynamic)
const depoimentosHTML = `
            <div class="text-center max-w-xl mx-auto mb-12 space-y-4">
                <span class="text-gold-400 text-xs tracking-widest uppercase font-medium">A Voz da Confiança</span>
                <h2 class="font-serif text-3xl sm:text-5xl text-white">Relatos daqueles que vivem a experiência</h2>
                <div class="w-16 h-[1px] bg-gold-400 mx-auto mt-4 mb-6"></div>
                <button @click="reviewModalOpen = true" class="bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm shadow-md transition-all inline-block">Deixar uma Avaliação</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <template x-for="review in approvedReviews" :key="review.id">
                    <div class="bg-obsidian-900 p-8 border border-obsidian-850 rounded-sm relative">
                        <div class="text-gold-400 mb-4 text-xs">
                            <template x-for="i in review.rating"><i class="fa-solid fa-star"></i></template>
                            <template x-for="i in 5 - review.rating"><i class="fa-regular fa-star"></i></template>
                        </div>
                        <p class="text-obsidian-300 font-light text-sm italic leading-relaxed mb-6" x-text="review.comment"></p>
                        <div class="flex items-center space-x-3 border-t border-obsidian-850 pt-4">
                            <div class="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center font-serif text-xs text-gold-400" x-text="review.initials"></div>
                            <div>
                                <span class="text-white text-xs font-semibold block" x-text="review.name"></span>
                                <span class="text-[10px] text-obsidian-400" x-text="review.role"></span>
                            </div>
                        </div>
                    </div>
                </template>
                <div x-show="approvedReviews.length === 0" class="col-span-1 md:col-span-2 lg:col-span-3 text-center text-obsidian-400 py-12">
                    Nenhuma avaliação aprovada no momento. Seja o primeiro a avaliar!
                </div>
            </div>
`;

index = index.replace(
    /<div class="text-center max-w-xl mx-auto mb-16 space-y-4">[\s\S]*?<!-- Depoimento 1 -->[\s\S]*?<!-- Depoimento 3 -->[\s\S]*?<\/div>\s*<\/section>/,
    depoimentosHTML + '\n        </section>'
);

// 5. Galeria and Contato Sections
const galeriaEContato = `
        <!-- Galeria -->
        <section id="galeria" class="py-24 px-6 max-w-7xl mx-auto border-t border-obsidian-850">
            <div class="text-center max-w-xl mx-auto mb-16 space-y-4">
                <span class="text-gold-400 text-xs tracking-widest uppercase font-medium">Nosso Espaço</span>
                <h2 class="font-serif text-3xl sm:text-5xl text-white">Galeria de Fotos</h2>
                <div class="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <template x-for="(img, idx) in gallery" :key="idx">
                    <div @click="openGalleryModal(img)" class="cursor-pointer aspect-square bg-obsidian-900 rounded-sm overflow-hidden border border-obsidian-800 relative group">
                        <img :src="img" class="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-75 transition-all duration-500">
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <i class="fa-solid fa-expand text-2xl text-white drop-shadow-md"></i>
                        </div>
                    </div>
                </template>
            </div>
            <div x-show="gallery.length === 0" class="text-center text-obsidian-400 py-12">
                Nenhuma foto na galeria no momento.
            </div>
        </section>

        <!-- Contato -->
        <section id="contato" class="py-24 px-6 max-w-4xl mx-auto border-t border-obsidian-850">
            <div class="text-center space-y-4 mb-12">
                <span class="text-gold-400 text-xs tracking-widest uppercase font-medium">Fale Conosco</span>
                <h2 class="font-serif text-3xl sm:text-5xl text-white">Envie sua Mensagem</h2>
            </div>
            <form @submit.prevent="submitContactForm" class="space-y-6 bg-obsidian-900 p-8 rounded-sm border border-obsidian-800">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Nome</label>
                        <input type="text" x-model="contactForm.name" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Telefone</label>
                        <input type="tel" x-model="contactForm.phone" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="block text-xs uppercase tracking-widest text-obsidian-300">E-mail</label>
                    <input type="email" x-model="contactForm.email" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                </div>
                <div class="space-y-2">
                    <label class="block text-xs uppercase tracking-widest text-obsidian-300">Assunto</label>
                    <input type="text" x-model="contactForm.subject" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                </div>
                <div class="space-y-2">
                    <label class="block text-xs uppercase tracking-widest text-obsidian-300">Mensagem</label>
                    <textarea x-model="contactForm.message" required rows="4" class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors"></textarea>
                </div>
                <button type="submit" class="w-full bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-semibold tracking-widest text-xs uppercase py-4 rounded-sm transition-all shadow-md flex justify-center items-center gap-2">
                    Enviar Mensagem <i class="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </section>
`;

index = index.replace('</main>', galeriaEContato + '\n    </main>');

// 6. Modals (Review & Gallery)
const modals = `
        <!-- Review Modal -->
        <div x-show="reviewModalOpen" style="display: none;" class="fixed inset-0 bg-obsidian-950/90 z-[60] backdrop-blur-md flex items-center justify-center p-6">
            <div class="bg-obsidian-900 border border-obsidian-800 max-w-lg w-full p-8 rounded-sm relative">
                <button @click="reviewModalOpen = false" class="absolute top-4 right-4 text-obsidian-400 hover:text-white"><i class="fa-solid fa-xmark text-xl"></i></button>
                <h3 class="font-serif text-2xl text-white mb-6">Deixe sua Avaliação</h3>
                <form @submit.prevent="submitReview" class="space-y-4">
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Nome</label>
                        <input type="text" x-model="reviewForm.name" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Serviço/Profissional Avaliado</label>
                        <input type="text" x-model="reviewForm.role" placeholder="Ex: Cliente Studio Lorena" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Nota (1 a 5)</label>
                        <select x-model="reviewForm.rating" required class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors">
                            <option value="5">5 Estrelas - Excelente</option>
                            <option value="4">4 Estrelas - Muito Bom</option>
                            <option value="3">3 Estrelas - Bom</option>
                            <option value="2">2 Estrelas - Regular</option>
                            <option value="1">1 Estrela - Ruim</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-xs uppercase tracking-widest text-obsidian-300">Seu Relato</label>
                        <textarea x-model="reviewForm.comment" required rows="3" class="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-sm p-3 text-white focus:outline-none transition-colors"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-semibold tracking-widest text-xs uppercase py-4 rounded-sm transition-all shadow-md mt-4">
                        Enviar Avaliação
                    </button>
                </form>
            </div>
        </div>

        <!-- Gallery Modal -->
        <div x-show="galleryModalOpen" style="display: none;" class="fixed inset-0 bg-obsidian-950/95 z-[70] backdrop-blur-md flex items-center justify-center p-4 sm:p-10">
            <button @click="galleryModalOpen = false" class="absolute top-6 right-6 text-white hover:text-gold-400 z-10"><i class="fa-solid fa-xmark text-3xl"></i></button>
            <img :src="selectedGalleryImg" class="max-w-full max-h-full object-contain border border-obsidian-800 rounded-sm shadow-2xl">
        </div>
`;
index = index.replace('<!-- Toast de Notificações Rápidas -->', modals + '\n        <!-- Toast de Notificações Rápidas -->');

// 7. Update Script to use localStorage logic
const scriptInitialData = `
        // Inicializar Banco de Dados Falso
        function initDB() {
            const defaultServices = {
                lorena: [
                    { id: 1, name: 'Axila', desc: 'Remoção com cera de alta qualidade.', price: 20, time: 15 },
                    { id: 2, name: 'Virilha completa', desc: 'Depilação íntima com máximo conforto e discrição.', price: 50, time: 35 },
                    { id: 3, name: 'Perna inteira', desc: 'Depilação completa das pernas.', price: 50, time: 45 },
                    { id: 4, name: 'Meia perna', desc: 'Depilação parcial da perna.', price: 30, time: 25 },
                    { id: 5, name: 'Rosto', desc: 'Remoção de pelos faciais com cera suave.', price: 20, time: 20 },
                    { id: 6, name: 'Buço', desc: 'Limpeza rápida e eficaz.', price: 10, time: 10 },
                    { id: 7, name: 'Braço inteiro', desc: 'Depilação completa dos braços.', price: 20, time: 25 },
                    { id: 8, name: 'Costas', desc: 'Depilação feminina das costas.', price: 20, time: 25 },
                    { id: 9, name: 'Sobrancelha', desc: 'Design e limpeza de sobrancelhas.', price: 15, time: 15 }
                ],
                marcio: [
                    { id: 10, name: 'Barba', desc: 'Cuidado masculino para a barba.', price: 20, time: 30 },
                    { id: 11, name: 'Corte', desc: 'Corte de cabelo masculino e infantil.', price: 20, time: 40 },
                    { id: 12, name: 'Pelos do nariz e orelha', desc: 'Remoção indolor e precisa.', price: 20, time: 15 },
                    { id: 13, name: 'Depilação costas', desc: 'Depilação com cera especial masculina.', price: 20, time: 25 },
                    { id: 14, name: 'Depilação peito', desc: 'Depilação com cera especial masculina.', price: 20, time: 25 },
                    { id: 15, name: 'Perna inteira', desc: 'Depilação completa das pernas.', price: 50, time: 45 },
                    { id: 16, name: 'Parte íntima', desc: 'Depilação com total discrição e higiene.', price: 50, time: 45 },
                    { id: 17, name: 'Combo depilação total', desc: 'Pacote completo: corpo total ou parcial.', price: 150, time: 120 },
                    { id: 18, name: 'Matizador para Barba', desc: 'Realce a cor da sua barba.', price: 10, time: 15 },
                    { id: 19, name: 'Mechas no Cabelo', desc: 'Estilo moderno e iluminado.', price: 50, time: 60 },
                    { id: 20, name: 'Desenhos Freestyle', desc: 'Arte exclusiva em cortes.', price: 30, time: 30 }
                ]
            };

            const defaultReviews = [
                { id: 1, name: 'Ana Maria G.', role: 'Cliente Studio Lorena', rating: 5, comment: 'Estou acostumada a fazer depilação e a Lorena é simplesmente genial. A cera que ela desenvolve não me dá foliculite e ela tem uma delicadeza que torna o momento super tolerável. O estúdio é impecável em termos de privacidade.', status: 'approved', initials: 'AM', date: new Date().toISOString() },
                { id: 2, name: 'Rodrigo C.', role: 'Cliente Márcio Lounge', rating: 5, comment: 'Encontrei no Márcio o barbeiro ideal. Ele tem uma precisão na tesoura incrível para cortes clássicos e a barboterapia é de dormir de tão relaxante. Faço depilação no peito com ele e a discrição e eficácia são absolutas.', status: 'approved', initials: 'RC', date: new Date().toISOString() },
                { id: 3, name: 'Valéria S.', role: 'Cliente Estética Atelier', rating: 5, comment: 'O L&M Atelier é diferenciado. O agendamento é super fluido e quando você chega é recebida de forma exclusiva com um bom espumante brut. Lorena cuidou do meu design de sobrancelhas e o resultado foi espetacular.', status: 'approved', initials: 'VS', date: new Date().toISOString() }
            ];

            const defaultGallery = [
                'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=600'
            ];

            if (!localStorage.getItem('lm_services')) localStorage.setItem('lm_services', JSON.stringify(defaultServices));
            if (!localStorage.getItem('lm_reviews')) localStorage.setItem('lm_reviews', JSON.stringify(defaultReviews));
            if (!localStorage.getItem('lm_gallery')) localStorage.setItem('lm_gallery', JSON.stringify(defaultGallery));
            if (!localStorage.getItem('lm_messages')) localStorage.setItem('lm_messages', JSON.stringify([]));
            if (!localStorage.getItem('lm_completed_appointments')) localStorage.setItem('lm_completed_appointments', JSON.stringify([]));
        }
        initDB();

        function bookingApp() {`;

index = index.replace('function bookingApp() {', scriptInitialData);

const newAppState = `
                lorenaServices: [],
                marcioServices: [],
                approvedReviews: [],
                gallery: [],
                
                reviewModalOpen: false,
                galleryModalOpen: false,
                selectedGalleryImg: '',
                
                contactForm: { name: '', phone: '', email: '', subject: '', message: '' },
                reviewForm: { name: '', role: '', rating: '5', comment: '' },
`;
index = index.replace('lorenaServices: [', newAppState + '\n                // REMOVED_STATIC_SERVICES');
// We need to remove the static arrays.
index = index.replace(/\/\/ REMOVED_STATIC_SERVICES[\s\S]*?marcioServices: \[[^\]]*\],/m, '');

const loadDataFunc = `
                loadDataFromDB() {
                    const services = JSON.parse(localStorage.getItem('lm_services'));
                    this.lorenaServices = services.lorena || [];
                    this.marcioServices = services.marcio || [];
                    
                    const reviews = JSON.parse(localStorage.getItem('lm_reviews'));
                    this.approvedReviews = reviews.filter(r => r.status === 'approved');
                    
                    this.gallery = JSON.parse(localStorage.getItem('lm_gallery')) || [];
                },

                submitContactForm() {
                    const messages = JSON.parse(localStorage.getItem('lm_messages')) || [];
                    messages.push({
                        id: Date.now(),
                        ...this.contactForm,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('lm_messages', JSON.stringify(messages));
                    this.contactForm = { name: '', phone: '', email: '', subject: '', message: '' };
                    this.triggerToast("Mensagem enviada com sucesso! Retornaremos em breve.");
                },

                submitReview() {
                    const reviews = JSON.parse(localStorage.getItem('lm_reviews')) || [];
                    const initials = this.reviewForm.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() || 'CLI';
                    reviews.push({
                        id: Date.now(),
                        name: this.reviewForm.name,
                        role: this.reviewForm.role,
                        rating: parseInt(this.reviewForm.rating),
                        comment: this.reviewForm.comment,
                        status: 'pending',
                        initials: initials,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('lm_reviews', JSON.stringify(reviews));
                    this.reviewForm = { name: '', role: '', rating: '5', comment: '' };
                    this.reviewModalOpen = false;
                    this.triggerToast("Avaliação enviada! Ela será exibida após aprovação.");
                },

                openGalleryModal(img) {
                    this.selectedGalleryImg = img;
                    this.galleryModalOpen = true;
                },
`;

index = index.replace(
    'this.loadSavedAppointments();',
    'this.loadSavedAppointments();\n                    this.loadDataFromDB();'
);

index = index.replace(
    '// Rolagem suave para seções específicas',
    loadDataFunc + '\n                // Rolagem suave para seções específicas'
);

// We need to also handle the completion of appointments in the admin panel, but in the user app, we just save it to "appointments" list.

fs.writeFileSync('index.html', index);
console.log('Done replacing index.html');
