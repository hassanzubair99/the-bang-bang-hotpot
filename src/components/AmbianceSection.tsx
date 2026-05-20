import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const media1 = [
  { type: 'image', url: 'https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.82787-15/532809253_18056715266598246_5052833252084647870_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzcwMTE5MDAxOTQxOTgyNTEyOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=wFjUmRgPNiIQ7kNvwHQjItQ&_nc_oc=Adpqa6ieZPh_zf9cabglmIJfDXYbytulQp3yk2i4kegb_8IZ34X-kFXJdEbMsFI7rbI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi22-1.fna&_nc_gid=ZYJN4l6r5e2ir-Z5GEOlEA&_nc_ss=7a22e&oh=00_Af75kzrgjsH-5VgRAckgZMHe-AzhzGGMar4il2jNjQCaaw&oe=6A13D84B' },
  { type: 'image', url: 'https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.82787-15/533745931_18056715386598246_7693751399844024866_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzcwMTE5MDAxOTU4NzY4NTA4Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=zhCoP76cTOoQ7kNvwEy1doh&_nc_oc=AdoRc3a2s-1VSMYLPl4BWFiqCSRSGi6_EMHyUlDOWwha9UJ2PGecO1opgFyypIYZL34&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi22-1.fna&_nc_gid=ZYJN4l6r5e2ir-Z5GEOlEA&_nc_ss=7a22e&oh=00_Af62FVf_7erIM8bpEJh6WaurEXh_XxNyAGSvZD-1kpYmxA&oe=6A13DF38' },
  { type: 'video', url: 'https://instagram.fkhi17-2.fna.fbcdn.net/o1/v/t2/f2/m367/AQNUrPncC0vXzfOAIB6L2mp4HcmVdve0tSAVLDiQAw-h_hepaELBatRyjU1m0oLFDdob3NlWzybliEWti2ag4G_ZaojmCjcijYnYNJA.mp4?_nc_cat=101&_nc_oc=AdonC9ehp3GSXMK0sWYz8AJY3mJbw2rnVE9w8owulmYfCsl4TCPekXKHKbBp2m7Qs98&_nc_sid=5e9851&_nc_ht=instagram.fkhi17-2.fna.fbcdn.net&_nc_ohc=T8nqspStO1EQ7kNvwHGQHfS&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0FST1VTRUxfSVRFTS5DMy43MjAuZGFzaF9iYXNlbGluZV8xX3YxIiwieHB2X2Fzc2V0X2lkIjo2MjE0NTkzMzEwMTM0MzcsImFzc2V0X2FnZV9kYXlzIjoyNzYsInZpX3VzZWNhc2VfaWQiOjEwMTQ2LCJkdXJhdGlvbl9zIjoxOCwidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&vs=c0729ece20823529&_nc_vs=HBkcFQIYQGlnX2VwaGVtZXJhbC8xRjREQkFERTkzNDNBMDQyRDI2MjQ0OThBRTA5MDQ5M192aWRlb19kYXNoaW5pdC5tcDQVAALIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm-uzW6tjNmgIVAigCQzMsF0Ay90vGp--eGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXuB2XEngEA&_nc_gid=8q901hD0FiO2taARyGMzuQ&_nc_zt=28&_nc_ss=7a22e&oh=00_Af4zuf3vHdNlrKa63EZ_7FlkN2YRcaSJuWhV9OQn06egRw&oe=6A13DCFA' },
  { type: 'image', url: 'https://instagram.fkhi17-2.fna.fbcdn.net/v/t51.82787-15/535220469_18056715407598246_4615937656380515296_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzcwMTE5MDAxOTQzNjYwNzM0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=hrp2uTaz7UcQ7kNvwFuSWW5&_nc_oc=AdqUgXtuMNq20vs5Xf2b1vcjwylJNgHbbyZhCqx0irzO-FaO4b-tGHt4z33Mjt-XLRI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi17-2.fna&_nc_gid=ZYJN4l6r5e2ir-Z5GEOlEA&_nc_ss=7a22e&oh=00_Af5KnEBP7O39G-bLuHVeLPEcTkNwkMYzkOahF52iz2LV_w&oe=6A13E1E2' },
  { type: 'image', url: 'https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.82787-15/532941118_18056715461598246_1739780533831438977_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzcwMTE5MDAxOTYwNDMyNzc4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=DtuOzg5YOS0Q7kNvwGjgxaO&_nc_oc=AdqzXo7nVf_Jkit2m5GdOEvvI05uKnBa8IcBwJx_48C3I7pdG9JZg7TM6_l_6a1ikOY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi22-1.fna&_nc_gid=ZYJN4l6r5e2ir-Z5GEOlEA&_nc_ss=7a22e&oh=00_Af5j_Vdld9GSF-D-9ZfASp2igfR58bBQCRGF8KY0YIQGiw&oe=6A13CB7F' }
];

const media2 = [
  { type: 'video', url: 'https://instagram.fkhi22-1.fna.fbcdn.net/o1/v/t2/f2/m86/AQNn197riqyh8AzQX6mwyPi5-aWTdhtWyTx-wb1hnRHMKEfX8TyKx2zJsGwUzpgau6ELa1sVSAggn80DVot6igmfM2g7VYBOPnFrp8o.mp4?_nc_cat=104&_nc_oc=AdruZP4XdwLCauzNP7YYktaPHWIlGO6pnPAeDuklENfKD2DQgAsQqBj1KgofaO7eocE&_nc_sid=5e9851&_nc_ht=instagram.fkhi22-1.fna.fbcdn.net&_nc_ohc=r4DE-6DIJaUQ7kNvwG6aOhZ&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTMwNzQ3NTE4NDA2MDI5NiwiYXNzZXRfYWdlX2RheXMiOjI2OCwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjI3LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=cbafebd0f92c9d4e&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9GMzQ4M0RBRUE4MEE3QTIyMUFGRERDMDQ4QzY0MUI4RF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYRmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC82OTY2Mzg3MDAwOTEyMzZfODE4ODE4NjI1MTk4ODQyNTA5Mi5tcDQVAgLIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmkJ6wnonJ0gQVAigCQzMsF0A7xBiTdLxqGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=Fiht8I8paKDNXv_QdnvtFw&_nc_zt=28&_nc_ss=7a22e&oh=00_Af4C337BXlqbsF1xW91_CGe3VysEmraIrGeJi2ldCUMUTQ&oe=6A0FF2BD' }
]

const PhoneFrame = ({ mediaList }: { mediaList: typeof media1 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % mediaList.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [mediaList]);

    return (
        <div className="relative w-72 h-[35rem] bg-gray-900 border-[10px] border-black rounded-[3rem] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] ring-4 ring-red-600 ring-opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.7)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    {mediaList[index].type === 'image' ? (
                        <img src={mediaList[index].url} className="w-full h-full object-cover" alt="Ambiance" />
                    ) : (
                        <video src={mediaList[index].url} autoPlay muted loop className="w-full h-full object-cover" />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const AmbianceSection = () => {
    return (
        <section className="bg-black py-20 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-white mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">OUR AMBIANCE</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
                <PhoneFrame mediaList={media1} />
                <PhoneFrame mediaList={media2} />
            </div>
        </section>
    );
};
