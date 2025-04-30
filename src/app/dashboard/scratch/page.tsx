"use client";


import Head from 'next/head';

import BaseCanvas from './base-canvas';
import { Rect } from 'react-konva';

export default function CanvasPage() {
    return (
        <div style={{ padding: '20px' }}>
            <Head>
                <title>Zoomable Canvas</title>
                <meta name="description" content="A zoomable and pannable canvas using React Konva" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 style={{ marginBottom: '20px' }}>Zoomable Canvas with React Konva</h1>
                <BaseCanvas mapName={''} minZoom={1} maxZoom={5}>
                    <Rect
                        x={20}
                        y={20}
                        width={50}
                        height={50}
                        fill="red"
                        shadowBlur={5}
                    />
                </BaseCanvas>
            </main>
        </div>
    );
};