import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UnitTestService } from './unit-test.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { arrayRemove } from 'firebase/firestore';

describe('UnitTestService', () => {
  let service: UnitTestService;
  let afs: AngularFirestore;
  let vars: any = {pid: "", lid: "", did: "", bid: "", rid: ""};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        UnitTestService,
        AngularFirestore
      ]
    });

    afs = TestBed.inject(AngularFirestore);
    service = TestBed.inject(UnitTestService);
  });

  //PROFILE UNIT TEST 1
  it('should make a new profile', async () => {
    let profile: any;

    await service.makeProfile(service.unitUser).then(async () => {
      await afs.collection('profiles').doc(service.unitUser.uid).ref.get().then((doc) => {
        profile = doc.data();
      })
    });

    expect(profile.profileName).toBe(service.unitUser.displayName);
    expect(profile.posts.length).toBe(0);
    expect(profile.followers.length).toBe(0);
    expect(profile.following.length).toBe(0);
    expect(profile.bannerURL).toBe("");
    expect(profile.bio).toBe("");
    expect(profile.link).toBe("");
    expect(profile.location).toBe("");
  });
  
  //PROFILE UNIT TEST 2
  it('should update the profile', async () => {
    let profile: any;

    const profileName = "The Unit Test Account"
    const bio = "This is the bio"
    const location = "This is the location"
    const link = "https://www.somewebsite.com"

    await service.updateProfile(profileName, bio, location, link).then(async () => {
      await afs.collection('profiles').doc(service.unitUser.uid).ref.get().then((doc) => {
        profile = doc.data();
      })
    });

    expect(profile.profileName).toBe(profileName);
    expect(profile.posts.length).toBe(0);
    expect(profile.followers.length).toBe(0);
    expect(profile.following.length).toBe(0);
    expect(profile.bannerURL).toBe("");
    expect(profile.bio).toBe(bio);
    expect(profile.link).toBe(link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ""));
    expect(profile.location).toBe(location);
  });

  //ROLE UNIT TEST 1
  it('should check if user is admin', async () => {
    expect(await service.isAdmin()).toBe(-1);
  });

  //POST TEST 1
  it('should make a new post', async () => {
    const content = 'test post';
    let post: any;

    vars.pid = await service.makePost(content);
    await afs.collection('posts').doc(vars.pid).ref.get().then((doc) => {
      post = doc.data();
    })

    expect(post.uid).toBe(service.unitUser.uid);
    expect(post.content).toBe(content);
    expect(post.likes.length).toBe(0);
    expect(post.dislikes.length).toBe(0);
    expect(post.replies.length).toBe(0);
  });

  //LIKE TEST 1
  it('should like the post', async () => {
    let like: any;

    vars.lid = await service.like(vars.pid);
    await afs.collection('likes').doc(vars.lid).ref.get().then((doc) => {
      like = doc.data();
    })

    expect(like.lid).toBe(vars.lid);
    expect(like.pid).toBe(vars.pid);
    expect(like.uid).toBe(service.unitUser.uid);
  });

  //DISLIKE TEST 1
  it('should dislike the post', async () => {
    let dislike: any;

    vars.did = await service.dislike(vars.pid);
    await afs.collection('dislikes').doc(vars.did).ref.get().then((doc) => {
      dislike = doc.data();
    })

    expect(dislike.did).toBe(vars.did);
    expect(dislike.pid).toBe(vars.pid);
    expect(dislike.uid).toBe(service.unitUser.uid);
  });

  //BOOKMARK TEST 1
  it('should bookmark the post', async () => {
    let bookmark: any;

    vars.bid = await service.bookmark(vars.pid);
    await afs.collection('bookmarks').doc(vars.bid).ref.get().then((doc) => {
      console.log(doc.data());
      bookmark = doc.data();
    })

    expect(bookmark.bid).toBe(vars.bid);
    expect(bookmark.pid).toBe(vars.pid);
    expect(bookmark.uid).toBe(service.unitUser.uid);
  });

  //REPLY TEST 1
  it('should reply to the post', async () => {
    const content = "test reply";
    let reply: any;

    vars.rid = await service.makeReply(content, vars.pid);
    await afs.collection('replies').doc(vars.rid).ref.get().then((doc) => {
      reply = doc.data();
    })

    expect(reply.content).toBe(content);
    expect(reply.pid).toBe(vars.pid);
    expect(reply.rid).toBe(vars.rid);
    expect(reply.uid).toBe(service.unitUser.uid);
  });

  //POST TEST 2
  it('should verify post interactions', async () => {
    let post: any;

    await afs.collection('posts').doc(vars.pid).ref.get().then((doc) => {
      post = doc.data();
    })

    expect(post.uid).toBe(service.unitUser.uid);
    expect(post.content).toBe("test post");
    expect(post.likes.length).toBe(1);
    expect(post.likes[0]).toBe(vars.lid);
    expect(post.dislikes.length).toBe(1);
    expect(post.dislikes[0]).toBe(vars.did);
    expect(post.replies.length).toBe(1);
    expect(post.replies[0]).toBe(vars.rid);
  });

  //LIKE TEST 2
  it('should try to like the post again', async () => {
    let like: any;

    await service.like(vars.pid);
    await afs.collection('likes').doc(vars.lid).ref.get().then((doc) => {
      like = doc.data();
    })

    expect(like).toBe(undefined);
  });

  //DISLIKE TEST 2
  it('should try to dislike the post again', async () => {
    let dislike: any;

    await service.dislike(vars.pid);
    await afs.collection('dislikes').doc(vars.did).ref.get().then((doc) => {
      dislike = doc.data();
    })

    expect(dislike).toBe(undefined);
  });

  //REPLY TEST 2
  it('should delete the post reply', async () => {
    let reply: any;

    await afs.collection("replies").doc(vars.rid).delete();
    await afs.collection('replies').doc(vars.rid).ref.get().then((doc) => {
      reply = doc.data();
    })
    await afs.collection("posts").doc(vars.pid).update({replies: arrayRemove(vars.rid)});

    expect(reply).toBe(undefined);
  });

  //BOOKMARK TEST 2
  it('should try to bookmark the post again', async () => {
    let bookmark: any;

    await service.bookmark(vars.pid);
    await afs.collection('bookmarks').doc(vars.bid).ref.get().then((doc) => {
      bookmark = doc.data();
    })

    expect(bookmark).toBe(undefined);
  });

  //POST TEST 3
  it('should verify removal of post interactions', async () => {
    let post: any;

    await afs.collection('posts').doc(vars.pid).ref.get().then((doc) => {
      post = doc.data();
    })

    expect(post.uid).toBe(service.unitUser.uid);
    expect(post.content).toBe("test post");
    expect(post.likes.length).toBe(0);
    expect(post.dislikes.length).toBe(0);
    expect(post.replies.length).toBe(0);
  });

  //BONUS TEST TO CLEAR DATA
  it('should delete the post and profile', async () => {
    let post: any;
    let profile: any;

    await afs.collection("posts").doc(vars.pid).delete();
    await afs.collection("profiles").doc(service.unitUser.uid).delete();

    await afs.collection('posts').doc(vars.pid).ref.get().then((doc) => {
      post = doc.data();
    })
    await afs.collection('profiles').doc(service.unitUser.uid).ref.get().then((doc) => {
      profile = doc.data();
    })

    expect(post).toBe(undefined);
    expect(profile).toBe(undefined);
  });
});