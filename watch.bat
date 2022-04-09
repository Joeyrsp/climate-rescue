FOR /L %%N IN () DO (
  tweego -o docs/index.html -w src
  ECHO TWEEGO HAS EXITED. PRESS ANY KEY TO CONTINUE
  PAUSE
)
