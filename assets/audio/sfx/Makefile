# Oggs can be made from wavs that are here ./  and not checked in 
# but usually will be made by a command like 
#
#   ND_SOURCE_WAVS=~/Music/Logic/Bounces/ND-SFX make oggs
#   
ND_SOURCE_WAVS ?= .

WAVS = $(wildcard $(ND_SOURCE_WAVS)/*.wav)
OGGS = $(WAVS:$(ND_SOURCE_WAVS)/%.wav=./%.ogg) 
# QSCALE is audio quality, range 1-10
QSCALE = 3

.PHONY: oggs
oggs: $(OGGS)

.PHONY: clean
clean:
	-rm $(OGGS)

$(OGGS) : $(WAVS)

%.ogg: $(ND_SOURCE_WAVS)/%.wav
	ffmpeg -v warning -y -channel_layout mono -i $< -acodec libvorbis -qscale:a $(QSCALE) $@
