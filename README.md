<p><a target="_blank" href="https://app.eraser.io/workspace/ZrZ2Y6GIWLepTjQg6cyc" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# VoiceWise AI
 Generate transcript, summary and action items from your notes in seconds. Streamline Your Workflow with Automated Transcription Action Item Management. Powered by Convex, Together.ai, and Whisper. 

### Live:
[﻿VoiceWise AI](https://voice-wise-ai.vercel.app/) 

 [﻿Tech Stack](#tech-stack) [﻿Architecture Diagram](#deploy-your-own) [﻿ER Diagram](#deploy-your-own)  [﻿Deploy Your Own](#deploy-your-own)  

## Tech Stack
- [﻿Convex](https://convex.dev/)  for the database and cloud functions
- Next.js [﻿App Router](https://nextjs.org/docs/app)  for the framework
- [﻿Together Inference](https://dub.sh/together-ai)  for the LLM (Mixtral)
- [﻿Together Embeddings](https://dub.sh/together-ai)  for the embeddings for search
- [﻿Convex File Storage](https://docs.convex.dev/file-storage)  for storing voice notes
- [﻿Convex Vector search](https://docs.convex.dev/vector-search)  for vector search
- [﻿Replicate](https://replicate.com/)  for Whisper transcriptions
- [﻿Clerk](https://clerk.dev/)  for user authentication
- [﻿Tailwind CSS](https://tailwindcss.com/)  for styling


## Architecture Diagram
![VoiceWiseAI - Architectural flow](/.eraser/ZrZ2Y6GIWLepTjQg6cyc___02a0ac4RaOW4qPyzxPn66zodRbA3___---figure---nJkzplnc-aOMNSowXYJWa---figure---OX24u6sfVgINr1b9RXyYIg.png "VoiceWiseAI - Architectural flow")



## ER Diagram
![VoiceWise AI - ER Diagram](/.eraser/ZrZ2Y6GIWLepTjQg6cyc___02a0ac4RaOW4qPyzxPn66zodRbA3___---figure---RON7P-1iclv-RowTe6S14---figure---d7OBMd20UuHDAdxCZ_nMrA.png "VoiceWise AI - ER Diagram")



## Deploy Your Own
You can deploy this template by setting up the following services and adding their environment variables:

1. Run `npm install`  to install dependencies.
2. Run `npm run dev` . It will prompt you to log into [﻿Convex](https://convex.dev/)  and create a project.
3. It will then ask you to supply the `CLERK_ISSUER_URL` . To do this:
    1. Make a [﻿Clerk](https://clerk.dev/)  account.
    2. Copy both the `CLERK_SECRET_KEY`  and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  [﻿API keys](https://dashboard.clerk.com/last-active?path=api-keys)  into `.env.local` .
    3. Do steps 1-3 [﻿here](https://docs.convex.dev/auth/clerk)  and copy the Issuer URL.
It should look something like `https://some-animal-123.clerk.accounts.dev` .
    4. Add `CLERK_ISSUER_URL`  to your [﻿Convex Environment Variables](https://dashboard.convex.dev/deployment/settings/environment-variables?var=CLERK_ISSUER_URL) 
(deep link also available in your terminal). Paste the Issuer URL as the value and click "Save".
4. Now your frontend and backend should be running and you should be able to log in but not record.
5. Make a [﻿Together](https://dub.sh/together-ai)  account to get your [﻿API key](https://api.together.xyz/settings/api-keys) .
6. Make a [﻿Replicate](https://replicate.com/)  account to get your [﻿API key](https://replicate.com/account/api-tokens) .
7. Save your environment variables in Convex [﻿as REPLICATE_API_KEY and TOGETHER_API_KEY](https://dashboard.convex.dev/deployment/settings/environment-variables?var=REPLICATE_API_KEY&var=TOGETHER_API_KEY) .



<!--- Eraser file: https://app.eraser.io/workspace/ZrZ2Y6GIWLepTjQg6cyc --->