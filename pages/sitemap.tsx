import { Tree, TreeNode } from 'react-organizational-chart'

export default function Sitemap() {
  return (
    <section className="bg-white">
      <Tree
        label={
          <div>
            <p>_app</p>
            <p>auth, recoil</p>
          </div>
        }
        lineBorderRadius="10px"
        lineColor="green"
        lineHeight="30px"
        lineWidth="3px"
      >
        <TreeNode label={<Node title="auth" />}>
          <TreeNode label={<Node title="signin" />}>
            <TreeNode label={<Node title="loader" />} />
          </TreeNode>
        </TreeNode>
        <TreeNode label={<Node title="index" />}>
          <TreeNode label={<Node title="dashboard" />}>
            <TreeNode label={<Node title="sidebar" />} />
            <TreeNode
              label={<Node title="body" props="spotifyApi, choosetrack" />}
            >
              <TreeNode
                label={<Node title="search" props="search, setSearch" />}
              />
              <TreeNode
                label={
                  <Node
                    title="songList"
                    props="Element, unlimited, data, chooseTrack"
                  />
                }
              >
                <TreeNode
                  label={
                    <Node
                      title="poster"
                      props="track, chooseTrack"
                      recoil="play, playingTrack"
                    />
                  }
                />
                <TreeNode
                  label={
                    <Node
                      title="track"
                      props="chooseTrack, track"
                      state="liked"
                      recoil="play, playingTrack"
                    />
                  }
                />
              </TreeNode>
              <TreeNode label={<Node title="genre" />} />
            </TreeNode>
            <TreeNode
              label={
                <Node
                  title="right"
                  props="spotifyApi, choosetrack"
                  state="recentlyPlayed"
                />
              }
            >
              <TreeNode label={<Node title="dropdown" />} />
              <TreeNode label={<Node title="rec. played" />} />
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode
          label={
            <Node title="player" props="accessToken, trackUri" recoil="play" />
          }
        />

        <TreeNode label={<Node title="sitemap" />} />
      </Tree>
    </section>
  )
}

function Node({ title, props, state, recoil }: any) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{props}</p>
      <p>{state && 's' + state}</p>
      <p>r: {recoil}</p>
    </div>
  )
}
