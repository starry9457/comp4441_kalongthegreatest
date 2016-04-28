function musicMode(mode) {
    if (mode == "default") {
        document.getElementById("orchestraTextArea").value = 
            ";sound.orc\n" + 
            "    sr = 44100\n" + 
            "    kr = 4410\n" + 
            "    ksmps = 10\n" + 
            "    nchnls = 1\n" + 
            ";--------------------------------------------------------------------\n" + 
            "instr  1                ; sine wave\n\n" +
            "idur    = p3\n" + 
            "iamp    = p4            ; p4 controls the amplitude\n" + 
            "ifreq   = cpspch(p5)    ; set tuning ratio in Hertz\n" + 
            "iattack = p6            ; attack time\n" + 
            "idecay  = p7            ; decay time\n" + 
            "iwave   = 1\n\n" + 
            "isus    = idur - iattack - idecay   ; sustain is remaining duration\n" + 
            "\n\n" + 
            "aenv    linseg  0, iattack, iamp, isus, iamp, idecay, 0   ; amp. env.\n" + 
            "asig    oscili  aenv, ifreq, iwave      ; signal\n\n" + 
            "out     asig          ; output\n" + 
            "    endin\n" + 
            ";--------------------------------------------------------------------\n"
    }
    else if (mode == "filter") {
        var tmp, filter_fr;
        tmp = document.getElementById("filter_fr").value;
        filter_fr = parseInt(tmp);

        // Low pass
        if ($(":radio[name=filter]:checked").val() == "low_filter") {
            document.getElementById("orchestraTextArea").value = 
                ";sound.orc\n" + 
                "    sr = 44100\n" + 
                "    kr = 4410\n" + 
                "    ksmps = 10\n" + 
                "    nchnls = 1\n" + 
                ";--------------------------------------------------------------------\n" + 
                "instr  1                ; sine wave\n\n" +
                "idur    = p3\n" + 
                "iamp    = p4            ; p4 controls the amplitude\n" + 
                "ifreq   = cpspch(p5)    ; set tuning ratio in Hertz\n" + 
                "iattack = p6            ; attack time\n" + 
                "idecay  = p7            ; decay time\n" + 
                "iwave   = 1\n\n" + 
                "isus    = idur - iattack - idecay   ; sustain is remaining duration\n" + 
                "ifiltfr = " + filter_fr +
                "\n\n" + 
                "aenv    linseg  0, iattack, iamp, isus, iamp, idecay, 0   ; amp. env.\n" + 
                "asig    oscili  aenv, ifreq, iwave      ; signal\n\n" + 
                "afilt   tone    asig, ifiltfr\n" + 
                "afilt2  tone    afilt, ifiltfr\n\n" + 
                "abal    balance afilt2, asig\n" + 
                "out     abal          ; output\n" + 
                "    endin\n" + 
                ";--------------------------------------------------------------------\n"   
        }
        // High pass
        else if ($(":radio[name=filter]:checked").val() == "high_filter") {
            document.getElementById("orchestraTextArea").value = 
                ";sound.orc\n" + 
                "    sr = 44100\n" + 
                "    kr = 4410\n" + 
                "    ksmps = 10\n" + 
                "    nchnls = 1\n" + 
                ";--------------------------------------------------------------------\n" + 
                "instr  1                ; sine wave\n\n" +
                "idur    = p3\n" + 
                "iamp    = p4            ; p4 controls the amplitude\n" + 
                "ifreq   = cpspch(p5)    ; set tuning ratio in Hertz\n" + 
                "iattack = p6            ; attack time\n" + 
                "idecay  = p7            ; decay time\n" + 
                "iwave   = 1\n\n" + 
                "isus    = idur - iattack - idecay   ; sustain is remaining duration\n" + 
                "ifiltfr = " + filter_fr +
                "\n\n" + 
                "aenv    linseg  0, iattack, iamp, isus, iamp, idecay, 0   ; amp. env.\n" + 
                "asig    oscili  aenv, ifreq, iwave      ; signal\n\n" + 
                "afilt   atone    asig, ifiltfr\n" + 
                "afilt2  atone    afilt, ifiltfr\n\n" + 
                "abal    balance afilt2, asig\n" + 
                "out     abal          ; output\n" + 
                "    endin\n" + 
                ";--------------------------------------------------------------------\n"   
        }
    }
    else if (mode == "vibrato") {
        document.getElementById("orchestraTextArea").value = 
            ";sound.orc\n" + 
            "    sr = 44100\n" + 
            "    kr = 4410\n" + 
            "    ksmps = 10\n" + 
            "    nchnls = 1\n" + 
            ";--------------------------------------------------------------------\n" + 
            "instr  1                ; sine wave\n\n" +
            "idur    = p3\n" + 
            "iamp    = p4            ; p4 controls the amplitude\n" + 
            "index   = 4             ; modulation index\n" +  
            "ifreq   = cpspch(p5)    ; set tuning ratio in Hertz\n" + 
            "iatk    = p6            ; attack time\n" + 
            "idec    = p7            ; decay time\n" + 
            "ivibrate  = 5\n" + 
            "ivibwidth = 0.05 * ifreq\n" + 
            "iwave   = 1\n\n" + 
            "imodfr  = ifreq * 2\n" + 
            "icarfr  = ifreq * 3\n" + 
            "\n\n" + 
            "aenv    linseg  0, iatk, 1, idur-iatk-idec, 1, idec, 0   ; amp. env.\n" + 
            "kvibwidth   linseg  0, idur, ivibwidth\n" + 
            "avib    oscili  kvibwidth, ivibrate, iwave\n" + 
            "amod    oscili  index*imodfr, imodfr, iwave\n" + 
            "acar    oscili  iamp, icarfr+amod+avib, iwave\n" + 
            "out     acar * aenv     ; output\n" + 
            "    endin\n" + 
            ";--------------------------------------------------------------------\n"
    }
}