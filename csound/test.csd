<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
	sr = 22050
	kr = 2205
	ksmps = 10
	nchnls = 1
garev init 0
;--------------------------------------------------------------------
instr  1				; sine wave

idur		= p3
iamp		= p4			; p4 controls the amplitude
ifreq		= cpspch(p5)		; set tuning ratio in Hertz
iattack		= p6			; attack time
idecay		= p7			; decay time
iwave		= 1

isus		= idur - iattack - idecay	; sustain is remaining duration


aenv	linseg	0,iattack,iamp,isus,iamp,idecay,0	; amp. env.
asig	oscili	aenv,ifreq,iwave			; signal

garev		= garev + asig
;	out	asig					; output
	endin
;--------------------------------------------------------------------

instr 96				; Csound global reverb instrument
idur		= p3
igain		= p4			; gain to control amplitude
irevtime	= p5			; reverb time
ireverb		= p6			; percent reverberated signal
iacoustic	= 1 - ireverb		; pct unreverberated
p3		= p3+irevtime+.1	; lengthen p3
inorm		= .91999		; normalize the tone

; make sure gain is between 0 and 1 (1 = 100%)
igain		= (igain <= 0 ? .01 : igain)
igain		= (igain > 1.0 ? 1.0 : igain)

; make sure % reverb between 0 and 1 (0 ok, 1=100%)
ireverb	= (ireverb > .99 ? .99 : ireverb)
ireverb	= (ireverb < 0 ? 0 : ireverb)
iacoustic	= 1 - ireverb 		; percent unreverberated


; reverberate the global signal with
; Schroeder reverberator
ac1		comb	garev, irevtime, .0297
ac2		comb	garev, irevtime, .0371
ac3		comb	garev, irevtime, .0411
ac4		comb	garev, irevtime, .0437
acomb		= ac1 + ac2 + ac3 + ac4
ap1		alpass	acomb, .09683, .005
arev		alpass	ap1, .03292, .0017

; mix signal (percent acoustic and percent reverbed)
aout		= (iacoustic * garev) + (ireverb * arev)

; attenuate and output the signal
	
	out     aout*igain/inorm
garev		= 0			; set garev to prevent feedback
	endin

</CsInstruments>
<CsScore>
f1 0 16385 10 846 284 473 44 70 67 36 36 13 4 

t 0 145
;	start	dur	amp		pitch	attck	decay 	
i1	0		1	0		8.00	.02		.05		
i1	+		0.5	4000	9.04	.02		.05		
i1	+		0.5	4000	9.02	.02		.05		
i1	+		1	4000	8.06	.02		.05		
i1	+		1	4000	8.08	.02		.05		
;=================================================
i1	+		0.5	4000	9.01	.02		.05		
i1	+		0.5	4000	8.11	.02		.05		
i1	+		1	4000	8.02	.02		.05		
i1	+		1	4000	8.04	.02		.05		
i1	+		0.5	4000	8.11	.02		.05		
i1	+		0.5	4000	8.09	.02		.05		
;=================================================
i1	+		1	4000	8.01	.02		.05		
i1	+		1	4000	8.04	.02		.05		
i1	+		2	4000	8.09	.02		.05		

;	istart	idur	igain	irevtime	ireverb
i96	0	12	1	2		0.1

end
</CsScore>
</CsoundSynthesizer>
<bsbPanel>
 <label>Widgets</label>
 <objectName/>
 <x>0</x>
 <y>0</y>
 <width>0</width>
 <height>0</height>
 <visible>true</visible>
 <uuid/>
 <bgcolor mode="nobackground">
  <r>255</r>
  <g>255</g>
  <b>255</b>
 </bgcolor>
</bsbPanel>
<bsbPresets>
</bsbPresets>
